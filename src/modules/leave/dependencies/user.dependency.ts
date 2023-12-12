import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CustomException } from "src/common/exceptions/custom.exception";
import { IReturnType } from "src/common/interfaces/return-type.interface";

@Injectable()
export class UserDependency {
  constructor() // @Inject(forwardRef(() => UserService))
  // private userService: UserService
  {}

  // async getUser(userId: string, tenantId?: string): Promise<IUser> {
  //     try {
  //         const response: IReturnType = await this.userService.findOneById(
  //             userId,
  //             tenantId
  //         );
  //         return response.data;
  //     } catch (err) {
  //         throw new CustomException(UserDependency.name, 'getUser', err);
  //     }
  // }
  // async findOneByIdRawQuery(userId: string, tenantId?: string) {
  //     try {
  //         const response: IReturnType =
  //             await this.userService.findOneByIdRawQuery(userId, tenantId);
  //         return response.data;
  //     } catch (err) {
  //         throw new CustomException(UserDependency.name, 'getUser', err);
  //     }
  // }
}
