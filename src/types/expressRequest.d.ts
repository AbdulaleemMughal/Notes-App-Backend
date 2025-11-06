import type { UserType } from "./user.type.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}