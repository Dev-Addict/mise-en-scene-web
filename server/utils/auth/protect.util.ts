import { Model } from "mongoose";

import { IUser } from "../../models";
import { AppError } from "../app-error.util";
import { Request } from "../../types";
import { getCookie } from "../cookies";
import { verify } from "./verify.util";

interface TokenData {
  id: string;
  iat: number;
}

export const protect = async (
  req: Request,
  User: Model<IUser>,
  throwError = true
) => {
  try {
    const bearerToken = req.headers.authorization || getCookie(req, "token");

    if (!bearerToken) {
      if (throwError) throw new AppError("0xE00000A", 401);
      else return;
    }

    if (!bearerToken.startsWith("Bearer ")) {
      if (throwError) throw new AppError("0xE00000C", 401);
      else return;
    }
    const token = bearerToken.split(" ")[1];

    const { id, iat } = await verify<TokenData>(
      token,
      process.env.JSON_WEB_TOKEN_SECRET || ""
    );

    const user = await User.findById(id);

    if (!user) {
      if (throwError) throw new AppError("0xE00000D", 401);
      else return;
    }

    if (user.isPasswordChanged(iat)) {
      if (throwError) throw new AppError("0xE000057", 401);
      else return;
    }
    req.user = user;

    return user;
  } catch (error) {
    if (throwError) throw error;
  }
};
