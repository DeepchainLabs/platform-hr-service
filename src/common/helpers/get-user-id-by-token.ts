// get user id from request
import * as jwt from "jsonwebtoken";
export const getUserIDByToken = (req: Request | any): any => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded: any = jwt.decode(token);
      // insert user_id to dto
      return decoded["user_id"];
    } catch (error) {
      return null;
    }
  }
};
