import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { LeaveApplicationRepository } from "../repositories/leave-application.repository";
import { ILeaveApplication } from "../interfaces/leave-application.interface";
import { CreateLeaveDto } from "../dto/create-leave.dto";
import { UpdateLeaveDto } from "../dto/update-leave.dto";
import { LeaveInfoService } from "./leave-info.service";
import { UpdateLeaveStatusDto } from "../dto";
import { CalendarDependency } from "../dependencies/calendar.dependency";
import * as moment from "moment";
import { LeaveTypeService } from "./leave-type.service";
import { UserDependency } from "../dependencies/user.dependency";
import { ConfigService } from "@nestjs/config";
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { IReturnType } from "src/common/interfaces/return-type.interface";
import { CustomException } from "src/common/exceptions/custom.exception";
import { HttpExceptionWithLog } from "src/common/exceptions/HttpExceptionWithLog.exceptions";
import { ClientRMQ, RpcException } from "@nestjs/microservices";
import { Observable, firstValueFrom } from "rxjs";
import { LeaveStatus } from "src/common/enums/leave-status.enum";
import { getAxios } from "src/config/axios_config";
import { LeaveCategoryService } from "./leave-category.service";

@Injectable()
export class LeaveApplicationService {
  constructor(
    private leaveApplicationRepository: LeaveApplicationRepository,
    private readonly leaveTypeService: LeaveTypeService,
    private readonly leaveInfoService: LeaveInfoService,
    private readonly configService: ConfigService,
    private readonly leaveCategoryService: LeaveCategoryService,
    @Inject("UserService") private readonly userServiceClient: ClientRMQ,

    private eventEmitter: EventEmitter2,
  ) {}

  findManyUsers(): Observable<any> {
    return this.userServiceClient.send("FIND_MANY_USERS", {});
  }
  async findAll(findOptions?: any): Promise<IReturnType> {
    try {
      const data = await this.leaveApplicationRepository.find(findOptions);
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveApplicationService.name, "findAll", err);
    }
  }

  async findAllWithPagination(
    findOptions: any,
    page: number,
    limit: number,
  ): Promise<[ILeaveApplication[], number]> {
    let data: [ILeaveApplication[], number];
    try {
      const users = await firstValueFrom(this.findManyUsers());
      data = await this.leaveApplicationRepository.findAndCount(findOptions);
      const res: any = [];
      data[0] &&
        data[0].map((d: any) => {
          const user = users[d.applied_for];
          const applied_for = {
            id: d.applied_for,
            name: user?.profile?.first_name + " " + user?.profile?.last_name,
            image: user?.profile?.image,
          };
          d.applied_for = applied_for;
          res.push(d);
        });
      return [res, data[1]];
      return data;
    } catch (err) {
      throw new CustomException(
        LeaveApplicationService.name,
        "findAllWithPagination",
        err,
      );
    }
  }

  async findOneById(id: string): Promise<IReturnType> {
    try {
      const data = await this.leaveApplicationRepository.findOneById(id);
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(
        LeaveApplicationService.name,
        "findOneById",
        err,
      );
    }
  }

  async findOne(findOptions: any, id?: string) {
    try {
      if (id) {
        findOptions.where = findOptions.where
          ? { ...findOptions.where, id: id }
          : { id: id };
      }

      const data: any = await this.leaveApplicationRepository.findOne(
        findOptions,
      );
      const users = await firstValueFrom(this.findManyUsers());
      const user = users[data?.applied_for];
      const applicant_info = {
        id: data?.applied_for,
        name: user?.profile?.first_name + " " + user?.profile?.last_name,
        image: user?.profile?.image,
      };
      data.applicant_info = applicant_info;
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveApplicationService.name, "findOne", err);
    }
  }

  /**
   * todo refactor
   * * only one findOne should be used
   */
  async findOneByAppliedBy(userId: string): Promise<IReturnType> {
    try {
      const data = await this.leaveApplicationRepository.findOne({
        applied_by: userId,
      });

      if (!data) {
        throw new HttpExceptionWithLog(
          "leave application not found",
          HttpStatus.NOT_FOUND,
          LeaveApplicationService.name,
          "findOneByAppliedBy",
        );
      }
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(
        LeaveApplicationService.name,
        "findOneByAppliedBy",
        err,
      );
    }
  }

  /**
   * todo refactor
   * * only one findOne should be used
   */
  async findOneByApprovedBy(user_id: string): Promise<IReturnType> {
    try {
      // const data = await this.leaveApplicationRepository.findOne({
      //     approved_by: userId,
      // });
      // will find user here
      const users = await firstValueFrom(this.findManyUsers());
      const data = users[user_id];
      data.id = user_id;
      if (!data) {
        throw new HttpExceptionWithLog(
          "leave application not found",
          HttpStatus.NOT_FOUND,
          LeaveApplicationService.name,
          "findOneByApprovedBy",
        );
      }
      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(
        LeaveApplicationService.name,
        "findOneByApprovedBy",
        err,
      );
    }
  }

  /**
   * this function will return a users all remaining leaves for a specific session
   * @param {string} userId
   * @param {string} sessionId?
   * @returns {IReturnType} Promise
   * TODO can be refactored
   * ? can be done in less queries
   */
  async getAllRemainingLeaves(
    userId: string,
    sessionId?: string,
  ): Promise<IReturnType> {
    try {
      let session;
      /**
       * if provides sessionId, get desired session or get current session for selected user
       */
      if (sessionId) {
        session = (await this.leaveInfoService.findOneById(sessionId)).data;
      } else {
        session = (
          await this.leaveInfoService.findOne({
            where: { user_id: userId },
            order: { created_at: "DESC" },
          })
        ).data;
      }
      /**
       * if session info not found, throw exception
       */
      if (!session)
        return {
          success: true,
          message:
            "This user has no leave information for selected/current session",
          data: [],
        };

      /**
       * get all types of leave
       */
      // const types = (
      //   await this.leaveTypeService.findAll({
      //     where: { is_active: true },
      //   })
      // ).data;
      const categories = (
        await this.leaveCategoryService.findAll({
          where: { is_active: true },
        })
      ).data;

      /**
       * get all approved applications of current session for selected user
       */
      const applications = await this.leaveApplicationRepository.find({
        where: {
          applied_for: userId,
          session_id: session.id,
          status: LeaveStatus.APPROVED,
        },
      });

      const daysUsed: any = {};

      /**
       * calculate num of leaves took by user in each type
       */
      applications.map((application) => {
        daysUsed[application.category_id as string] =
          daysUsed[application.category_id as string] || 0;

        daysUsed[application.category_id as string] +=
          application.num_of_working_days || 0;
      });

      /**
       * prepare data for return with calculating remaining days
       */
      const data =
        categories &&
        categories.map((type: any) => ({
          category_id: type.id,
          categoryName: type.title,
          allowedDays: type.num_of_days_allowed,
          usedDays: daysUsed[type.id] || 0,
          remaining: type.num_of_days_allowed - (daysUsed[type.id] || 0),
        }));

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(
        LeaveApplicationService.name,
        "getAllRemainingLeaves",
        err,
      );
    }
  }

  /**
   * This function will return remaining leaves for specific user for specific session and type
   * @param {string} userId
   * @param {string} typeId
   * @param {string} sessionId
   * @returns {number} Promise
   */
  async getRemainingLeavesByTypeAndSession(
    userId: string,
    category_id: string,
    sessionId?: string,
  ): Promise<number> {
    // try {
    let session;
    /**
     * if provides sessionId, get desired session or get current session for selected user
     */
    if (sessionId) {
      session = (await this.leaveInfoService.findOneById(sessionId)).data;
    } else {
      session = (
        await this.leaveInfoService.findOne({
          where: { user_id: userId },
          order: { created_at: "DESC" },
        })
      ).data;
    }
    /**
     * if session info not found, throw exception
     */
    if (!session)
      throw new RpcException(
        "This user has no leave information for selected/current session",
      );

    /**
     * get info for desired leave type
     */
    // const type = (await this.leaveTypeService.findOneById(typeId)).data;
    const category = (await this.leaveCategoryService.findOneById(category_id))
      .data;
    if (!category) throw new RpcException("category not found");

    /**
     * get all approved applications of selected user for selected session and type
     * TODO: use sum function instead
     */
    const applications = await this.leaveApplicationRepository.find({
      where: {
        applied_for: userId,
        category_id: category_id,
        session_id: session.id,
        status: LeaveStatus.APPROVED,
      },
    });

    /**
     * calculate total enjoyed leave by selected user for selected session and type
     */
    let daysUsed = 0;
    applications.map((application) => {
      daysUsed += application.num_of_working_days || 0;
    });

    return category.num_of_days_allowed - daysUsed;
    // } catch (err) {
    //   throw new CustomException(
    //     LeaveApplicationService.name,
    //     "getRemainingLeavesByTypeAndSession",
    //     err,
    //   );
    // }
  }

  /**
   * This function will create a leave application
   * @param {CreateLeaveTypeDto} dto
   * @returns {IReturnType} Promise
   */

  sendMail(payload: any) {
    this.eventEmitter.emit("SEND_MAIL", payload);
  }

  async createOne(dto: CreateLeaveDto): Promise<IReturnType> {
    // try {
    const users = await firstValueFrom(this.findManyUsers());
    const appliedFor = users[dto.applied_for as string];
    console.log({ appliedFor });
    /**
     * get current session info for user
     */
    let session = (
      await this.leaveInfoService.findOne({
        where: { user_id: dto.applied_for },
        order: { created_at: "DESC" },
      })
    ).data;
    if (session && moment(session?.end_date) < moment(new Date())) {
      const newDate = moment(session?.end_date).add(1, "days").toDate();
      await this.leaveInfoService.createOne({
        user_id: dto.applied_for as string,
        start_date: newDate,
      });
      session = (
        await this.leaveInfoService.findOne({
          where: { user_id: dto.applied_for },
          order: { created_at: "DESC" },
        })
      ).data;
    }
    if (!session) {
      //if session not available, creating one for this user with joining date
      await this.leaveInfoService.createOne({
        user_id: dto.applied_for as string,
        start_date: appliedFor.registered_at,
      });
      session = (
        await this.leaveInfoService.findOne({
          where: { user_id: dto.applied_for },
          order: { created_at: "DESC" },
        })
      ).data;
    }

    const remainingLeaves =
      session &&
      (await this.getRemainingLeavesByTypeAndSession(
        dto.applied_for as string,
        dto.category_id,
        session.id as string,
      ));
    console.log({ remainingLeaves, days: dto.num_of_working_days });

    const sessionEndDistance =
      session && moment(session.end_date).diff(dto.end_date, "days");
    if (
      (dto.num_of_working_days && +dto.num_of_working_days < 1) ||
      (sessionEndDistance && sessionEndDistance < 0)
    )
      throw new RpcException("Invalid date");

    /**
     * check if user requests for more leaves of requested type
     * than his remaining leaves of that type
     */
    if (
      dto.num_of_working_days &&
      remainingLeaves &&
      +dto.num_of_working_days > remainingLeaves
    )
      throw new RpcException(
        `You can apply for maximum ${remainingLeaves} days`,
      );

    /**
     * create a leave application for user
     */
    const data =
      session &&
      (await this.leaveApplicationRepository.create({
        ...dto,
        status: LeaveStatus.PENDING,
        session_id: session.id,
        created_by: dto.applied_by,
      }));
    const EMAILS = this.configService.get<string>("env.EMAILS");
    console.log({ data });
    const emails = this.convertToEmailArray(EMAILS as any);
    let emails_data = [];
    const capitalizedName =
      appliedFor?.username?.charAt(0)?.toUpperCase() +
      appliedFor?.username?.slice(1);
    const emailBody = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
              .email-container {
                background-color: #f0f0f0;
                padding: 1rem;
                
              }
              .flex-center {
                display: flex;
                justify-content: center;
              }
              .logo {
                height: 2.5rem;
                width: 10rem;
              }
              .email-content {
                position: relative;
                border-radius: 0.5rem;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                padding: 1rem;
                margin-top: 1rem;
                margin-left: auto;
                margin-right: auto;
                max-width: 30rem;
                z-index: 1; /* Make sure the content is above the background */
                background-color: rgba(255, 255, 255, 0.1);
              }
            
              .email-content::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: url('https://assets.techreviewer.co/uploads/company/image/5107/56573c79-5bb3-4c5c-b7e6-9a2b698d8224.png');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                opacity: 0.1; /* Adjust the opacity for the background image */
                z-index: -1;
              }
            
              .header {
                color: #ffffff;
                text-align: center;
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 1rem;
                background-color: #354bb8;
                margin:2% 20%;
              }
              .date {
                color: #555555;
                text-align: start;
                margin-bottom: 0.25rem;
                font-weight:bold
              }
              .content {
                color: #333333;
                margin-bottom: 1rem;
              }
              .signature {
                display: grid;
                align-items: center;
                margin-top: 0.5rem;
                color: #555555;
              }
            
              /* Button style */
              .approve-button {
                background-color: #354bb8;
                color: white;
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 0.25rem;
                cursor: pointer;
                text-decoration: none;
              }
              .reject-button {
                background-color: #ee1414;
                color: white;
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 0.25rem;
                cursor: pointer;
                text-decoration: none;
              }
               .blue-text {
                color: #354bb8;
                font-weight: bold;
              }
            </style>
            </head>
            <body>
            <div class="email-container ">
              <div class="email-content">
              <center>
              <img src="https://api.tracker.deepchainlabs.com/public/uploads/task/1693490225807_7054994.png" alt="image" class="logo">
            </center>
                <p class="header">Leave Application</p>
                <p class="date">Date: August 31, 2023</p>
                <p class="date">Subject: Application for advance leave</p>
                 <p class="content">
                  Dear Sir,<br><br>
                  I am writing to request a <span class="blue-text">${
                    dto.num_of_working_days && dto.num_of_working_days > 1
                      ? `${dto.num_of_working_days} days`
                      : `${dto.num_of_working_days} day`
                  }</span>  leave of absence starting from <span class="blue-text">${moment(
      dto.start_date,
    ).format("LL")}</span>  to <span class="blue-text">${moment(
      dto.end_date,
    ).format(
      "LL",
    )}</span> . The reason for my leave is <span class="blue-text">${
      dto.reason
    }</span> . During my absence, I will ensure that my responsibilities are taken care of, and I will provide any necessary assistance to my colleagues to ensure a smooth workflow.<br><br>
                  Please let me know if there are any specific procedures or tasks I need to complete before my leave. I will make sure to complete all pending work and hand over any ongoing projects to a colleague.<br><br>
                  Thank you for considering my request. I will ensure that my absence has minimal impact on the team's productivity. I look forward to your approval.
                </p>
                <div class="signature">
                <div class="date">
                <p class="font-semibold">Sincerely,</p>
                <p>${
                  appliedFor?.profile?.first_name +
                  " " +
                  appliedFor?.profile?.last_name
                }</p>
               </div>
                 <div>
                  <a  id="dynamic-link" class="approve-button" href='https://tracker.deepchainlabs.com/leave/approve?id=${
                    data?.id
                  }'  style="color:white;">Approve</a>
                  <a id="dynamic-link" class="reject-button"  href='https://tracker.deepchainlabs.com/leave/approve?id=${
                    data?.id
                  }'  style="color:white;">Reject</a>
                 </div>
                
                </div>
              </div>
            </div>
            <script>
  const dynamicLink = document.getElementById('dynamic-link');
  dynamicLink.href = 'https://tracker.deepchainlabs.com/leave/approve?id=${
    data?.id
  }'
</script>
            </body>
            </html>
            
            
            
                `;
    for await (const obj of emails) {
      emails_data.push({
        to: obj,
        subject: `${capitalizedName + "'s"} New Leave Application`,
        body: emailBody,
      });
    }
    //TODO NEED TO SEND MAIL FROM HERE
    // await this.sendEmail(emails_data);
    this.sendMail(emails_data);
    const text = `
**<@${appliedFor.discord_id}>** requested for ${
      dto.num_of_working_days && dto.num_of_working_days > 1
        ? `${dto.num_of_working_days} days `
        : `${dto.num_of_working_days} day `
    } leave.
**Requested Date : **${moment(dto.start_date).format("LL")} to ${moment(
      dto.end_date,
    ).format("LL")}
**Leave Reason : **${dto.reason}
**Click here to approve,** https://tracker.deepchainlabs.com/leave/approve?id=${
      data?.id
    }
                `;
    const embed = new EmbedBuilder()
      .setColor(0x2465ef)
      .setURL("https://tracker.deepchainlabs.com/")
      .setDescription(text)
      .setAuthor({
        name: `${
          appliedFor?.profile?.first_name + " " + appliedFor?.profile?.last_name
        } Applied for a new leave application`,
        iconURL: `https://api.tracker.deepchainlabs.com${appliedFor?.profile?.image?.slice(
          1,
        )}`,
      });
    //TODO NEED TO SEND DISCORD NOTIFICATION FROM HERE
    // await this.emailService.sendDiscordNotification([embed]);

    const HR_CHANNEL = this.configService.get<string>("env.HR_CHANNEL");
    this.sendDiscordNotification({
      channelId: HR_CHANNEL,
      msg: [embed],
    });
    console.log("here....", data);
    return {
      success: true,
      message: "Leave Application Created",
      data: data,
    };
    // } catch (err) {
    //   throw new CustomException(LeaveApplicationService.name, "createOne", err);
    // }
  }
  convertToEmailArray(emails: string): string[] {
    return emails.split(",").map((email) => email.trim());
  }
  sendDiscordNotification(payload: any) {
    this.eventEmitter.emit("SEND_DISCORD_NOTIFICATION", payload);
  }
  async sendEmail(email_data: any) {
    try {
      for await (const obj of email_data) {
        try {
          const email_url = this.configService.get<string>("env.EMAIL_URL");
          const data = {
            to_address: obj.to,
            subject: obj.subject,
            body: obj.body,
          };
          await getAxios({
            method: "post",
            data,
            url: `${email_url}/mails/send/html`,
          });
        } catch (error) {
          console.log(error);
        }
      }
      console.log("success!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  /**
   * This function will update status of a leave application
   * @param {string} id
   * @param {UpdateLeaveStatusDto} dto
   * @param {userId} userId?
   * @returns {IReturnType} Promise
   */
  async updateStatus(
    id: string,
    dto: UpdateLeaveStatusDto,
    userId?: string,
  ): Promise<IReturnType> {
    try {
      /**
       * get the application
       */
      const application = await this.leaveApplicationRepository.findOneById(id);
      if (!application)
        throw new HttpExceptionWithLog(
          "leave application not found",
          HttpStatus.NOT_FOUND,
          LeaveApplicationService.name,
          "updateStatus",
        );

      let data: any;
      /**
       * check status provided in dto
       */
      if (dto.status == LeaveStatus.CANCELED) {
        /**
         * if provided status is 'canceled', check who requested to update the status
         * if applicant owns the application, proceed
         * or block
         */
        if (
          userId != application.applied_by ||
          userId != application.applied_for
        )
          throw new HttpExceptionWithLog(
            "Invalid status",
            HttpStatus.BAD_REQUEST,
            LeaveApplicationService.name,
            "updateStatus",
          );

        data = await this.leaveApplicationRepository.update(id, {
          status: dto.status,
          updated_by: userId,
          // canceled_by: userId,
          // canceled_at: new Date(),
        });
      } else {
        /**
         * if provided status is 'approved' or 'rejected', proceed
         * or throw exception
         */
        switch (dto.status) {
          case LeaveStatus.APPROVED:
            data = await this.leaveApplicationRepository.update(id, {
              ...dto,
              updated_by: userId,
              approval_date: new Date(),
            });
            break;
          case LeaveStatus.REJECTED:
            data = await this.leaveApplicationRepository.update(id, {
              ...dto,
              // rejected_by: userId,
              updated_by: userId,
              approval_date: new Date(),
            });
            break;
          default:
            throw new HttpExceptionWithLog(
              "Invalid status",
              HttpStatus.BAD_REQUEST,
              LeaveApplicationService.name,
              "updateStatus",
            );
        }
      }

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(
        LeaveApplicationService.name,
        "updateStatus",
        err,
      );
    }
  }

  async patchOne(id: string, dto: UpdateLeaveDto): Promise<IReturnType> {
    // try {
    const users = await firstValueFrom(this.findManyUsers());
    const appliedApplicationFor = users[dto?.applied_for as string];
    const getUserByRawQuery = users[dto.applied_for as string];
    const getApprovedByUser = users[dto.approved_by as string];

    const remainingLeaves: any =
      dto.category_id &&
      dto.session_id &&
      (await this.getRemainingLeavesByTypeAndSession(
        dto.applied_for as string,
        dto.category_id,
        dto.session_id as string,
      ));
    // console.log("Debug Info:", {
    //   category: dto.category_id,
    //   session: dto.session_id,
    //   num_of_working_days: dto.num_of_working_days,
    //   remainingLeaves: remainingLeaves,
    //   condition: ((dto.num_of_working_days as number) >
    //     remainingLeaves) as any,
    // });

    if (((dto.num_of_working_days as number) > remainingLeaves) as any) {
      throw new RpcException(
        `You can apply for a maximum of ${remainingLeaves} days`,
      );
    }
    const leave = await this.leaveApplicationRepository.findOneById(id);
    if (!leave) throw new RpcException("leave application not found");

    const data = await this.leaveApplicationRepository.update(id, dto);

    const EMAILS = this.configService.get<string>("env.EMAILS");

    const emails = this.convertToEmailArray(EMAILS as any);
    let emails_data = [];
    const capitalizedName =
      appliedApplicationFor?.username?.charAt(0)?.toUpperCase() +
      appliedApplicationFor?.username?.slice(1);
    const capitalizedApplicant =
      appliedApplicationFor?.username?.charAt(0)?.toUpperCase() +
      appliedApplicationFor?.username?.slice(1);

    //Sending Mail Notification to Admins
    for (const obj of emails) {
      emails_data.push({
        to: obj,
        subject: `Leave Application ${
          dto.status === "Pending" ? `Updated ` : dto.status
        }`,
        body: `<h1><strong>${capitalizedName} ${
          dto.status === "Pending" ? `Updated` : dto.status
        } a Leave Application ${
          dto.status === "Approved"
            ? `✅`
            : dto.status === "Rejected"
            ? `❌`
            : `🛠️ `
        }</strong></h1> 
                    </br> 
                    <h3>Requested Date : ${moment(dto.start_date).format(
                      "LL",
                    )} to ${moment(dto.end_date).format("LL")}</h3>
                    </br>
                    <h3>Leave Applicant : ${capitalizedApplicant}</h3>
                    </br>
                    <h3>Leave Reason : ${dto.reason}</h3>
                    </br>
                    <h3>Leave Day :${dto.num_of_working_days}</h3>
                    <h3>Click this link for approve, https://tracker.deepchainlabs.com/leave/approve?id=${
                      data?.id
                    }</h3>`,
      });
    }
    //TODO NEED TO SEND MAIL FROM HERE
    this.sendMail(emails_data);
    // await this.sendEmail(emails_data);
    //   await this.emailService.sendEmailJob(emails_data);
    //Sending Discord Notification to Admins
    const text = `
**<@${appliedApplicationFor.discord_id}>** ${
      dto.status === "Pending" ? `Updated` : dto.status
    } a leave application ${
      dto.status === "Approved"
        ? `✅`
        : dto.status === "Rejected"
        ? `❌`
        : `🛠️ `
    }
**Requested Date : **${moment(dto.start_date).format("LL")} to ${moment(
      dto.end_date,
    ).format("LL")}
**Leave Applicant : **<@${appliedApplicationFor?.discord_id}>
**Reason : **${dto.reason}
**Leave Day : **${dto.num_of_working_days}
**Click here to approve,** https://tracker.deepchainlabs.com/leave/approve?id=${
      data?.id
    }
                `;
    const embed = new EmbedBuilder()
      // .setColor(0x606ffb)
      // .setTitle(`New Leave Application`)
      .setURL("https://tracker.deepchainlabs.com/")
      .setDescription(text);

    if (dto.status === "Approved") {
      embed
        .setAuthor({
          name: `${
            getApprovedByUser?.profile?.first_name +
            " " +
            getApprovedByUser?.profile?.last_name
          } Approved a leave application`,
          iconURL: `https://api.tracker.deepchainlabs.com${getApprovedByUser?.profile?.image?.slice(
            1,
          )}`,
        })
        .setColor(0x4fd240);
    } else if (dto.status === "Rejected") {
      embed
        .setAuthor({
          name: `${
            getApprovedByUser?.profile?.first_name +
            " " +
            getApprovedByUser?.profile?.last_name
          } Rejected a leave application`,
          iconURL: `https://api.tracker.deepchainlabs.com${getApprovedByUser?.profile?.image?.slice(
            1,
          )}`,
        })
        .setColor(0xef142e);
    } else {
      embed
        .setAuthor({
          name: `${
            getUserByRawQuery?.profile?.first_name +
            " " +
            getUserByRawQuery?.profile?.last_name
          } Updated a  leave application`,
          iconURL: `https://api.tracker.deepchainlabs.com${getUserByRawQuery?.profile?.image?.slice(
            1,
          )}`,
        })
        .setColor(0xeecb0a);
    }

    //TODO NEED TO SEND DISCORD NOTIFICATION FROM HERE
    // await this.emailService.sendDiscordNotification([embed]);
    const HR_CHANNEL = this.configService.get<string>("env.HR_CHANNEL");
    this.sendDiscordNotification({
      channelId: HR_CHANNEL,
      msg: [embed],
    });
    //Sending Notification to applicant if Application approved or rejected
    const applicationMail = [
      {
        to: appliedApplicationFor?.secondary_email,
        subject: `Leave Application ${dto.status}`,
        body: `<h1><strong>${capitalizedName} ${
          dto.status
        } Your Leave Application ${
          dto.status === "Approved"
            ? `✅`
            : dto.status === "Rejected"
            ? `❌`
            : `🛠️`
        }</strong></h1>
                    </br>
                    <h3>Requested Date : ${moment(dto.start_date).format(
                      "LL",
                    )} to ${moment(dto.end_date).format("LL")}
                    </h3>
                    </br>
                    <h3>Reason: ${dto.reason}</h3>
                    </br>
                   ${
                     dto?.remarks
                       ? ` <h3>Rejected Reason: ${dto.remarks}</h3>
                        </br>`
                       : ``
                   }
                    <h3>Leave Day :${dto.num_of_working_days}</h3>`,
      },
    ];

    if (
      (dto.status === "Rejected" || dto.status === "Approved") &&
      appliedApplicationFor?.secondary_email
    ) {
      //TODO NEED TO SEND EMAIL FROM HERE
      // await this.emailService.sendEmailJob(applicationMail);
      await this.sendEmail(applicationMail);
      // await this.sendNotification(
      //   dto.applied_for as string,
      //   dto.approved_by as string,
      //   id,
      //   dto.status,
      // );
    }
    console.log({ data });
    return {
      success: true,
      message: "",
      data: data,
    };
    // } catch (err) {
    //   throw new CustomException(LeaveApplicationService.name, "patchOne", err);
    // }
  }
  //   async sendNotification(
  //     applied_for: string,
  //     applied_by: string,
  //     application_id: string,
  //     status: string,
  //   ) {
  //     try {
  //       const notificationTypes =
  //         await this.notificationDependency.getAllNotificationTypes();

  //       let type;

  //       if (status === "Approved") {
  //         type = notificationTypes.find((t) => t.title === "Leave_Approved");
  //       } else if (status === "Rejected") {
  //         type = notificationTypes.find((t) => t.title === "Leave_Rejected");
  //       }

  //       const notificationData = {
  //         msg: "",
  //         for_user_id: applied_for,
  //         from_user_id: applied_by,
  //         type_id: type?.id ? type?.id : "",
  //         entity_id: application_id,
  //         seen_flag: false,
  //       };
  //       await this.notificationDependency.createNotification(notificationData);

  //       //fetch and send notification

  //       const notifications =
  //         await this.notificationDependency.findAllWithPagination({
  //           where: { for_user_id: applied_for },
  //           relations: { task: true },
  //           take: 10,
  //           skip: 0,
  //         });

  //       const paginateData = paginateResponse(notifications, 1, 10);
  //       const activeConnection =
  //         await this.leaveApplicationRepository.findOneActiveConnection(
  //           applied_for,
  //         );
  //       // send notification through socket
  //       this.emitNotification({
  //         data: paginateData?.data,
  //         activeConnection,
  //       });
  //     } catch (error) {}
  //   }
  //   emitNotification(payload: any) {
  //     this.eventEmitter.emit("notification", payload);
  //   }
  async deleteOne(id: string): Promise<IReturnType> {
    try {
      const data = await this.leaveApplicationRepository.delete(id);

      return {
        success: true,
        message: "",
        data: data,
      };
    } catch (err) {
      throw new CustomException(LeaveApplicationService.name, "deleteOne", err);
    }
  }

  getMonthAndYearFromPeriod(period: string): [string | number, number] {
    try {
      const [month, year, ...extra] = period.split("-");
      // FIXME: parseInt("2abc50") returns 2 which indicates a valid month. If this happens, a wrong input for month can also treat as valid which should not happen. Update the return statement to avoid this issue.
      return [
        parseInt(month) || month,
        year ? parseInt(year) : moment().year(),
      ];
    } catch {
      throw new BadRequestException("Period not valid");
    }
  }

  getTotalDaysOfAMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  //   async trackLeaveWithoutPermission(
  //     userId: string,
  //     period: string,
  //   ): Promise<IReturnType> {
  //     try {
  //       const [month, year] = this.getMonthAndYearFromPeriod(period);

  //       // get all holidays from calendar
  //       const numOfHolidays =
  //         await this.calendarDependency.getAllHolidaysByPeriod(period);

  //       // get total number of days worked by user
  //       const numOfWorkDays =
  //         await this.sprintDependency.getTotalWorkDaysByUserAndPeriod(
  //           userId,
  //           month as number,
  //           year,
  //         );
  //       // get total number of leave by user

  //       return {
  //         success: true,
  //         message: "",
  //         data:
  //           this.getTotalDaysOfAMonth(month as number, year) -
  //           numOfHolidays -
  //           numOfWorkDays,
  //       };
  //     } catch (err) {
  //       throw new CustomException(LeaveApplicationService.name, "deleteOne", err);
  //     }
  //   }
}
