import ApiError from "../../errors/ApiError";
import { UserModel } from "../users/users.model";
import { ILogInUser } from "./auth.interface";
import httpsStatus from "http-status-codes";
import jwt from "jsonwebtoken";
const LogIn = async (payload: ILogInUser) => {
  const { email, password } = payload;

  const isEmailExist = await UserModel.exists({ email });
  console.log(1)
  const isPasswordExist = await UserModel.exists({ password });
  console.log(isPasswordExist)

  if (!isEmailExist) {
    throw new ApiError(httpsStatus.NOT_FOUND, "email not found");
  }
  if (!isPasswordExist) {
    throw new ApiError(httpsStatus.NOT_FOUND, "password not found");
  }
  const userExist = await UserModel.findOne({
    email: email,
    password: password,
  });
  console.log(userExist);

  if (userExist) {
    const payload = { email: userExist.email, role: userExist.role };
    const jwtToken = jwt.sign(payload, "very-secret", { expiresIn: "365d" });
    return {
        status:httpsStatus.OK,
        user:{
            id:userExist._id,
          email:  userExist.email
        },
        token:jwtToken

    };
  }
  
};
export const AuthService = { LogIn };
