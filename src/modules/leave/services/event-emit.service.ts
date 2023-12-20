import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ConfigService } from "@nestjs/config";
import { getAxios } from "src/config/axios_config";

@Injectable()
export class EventListenService {
  constructor(private readonly configService: ConfigService) {}
  @OnEvent("SEND_MAIL")
  async handleEvent(email_data: any) {
    console.log("hello");
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
  }
}
