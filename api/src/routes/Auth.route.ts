import { Router } from "express";
import { generalErrorctaher } from "../utils/generalErrorcatcher.js";
import {
  registerUser,
  login,
  refresh,
  logout,
} from "../controller/auth.controller.js";
import schemaValidator from "../middleware/validatorMiddleware.js";
import { loginSchema, registerSchema } from "../validator/authValidator.js";

const authRouter = Router();

authRouter.post(
  "/register",
  schemaValidator(registerSchema),
  generalErrorctaher(registerUser)
);
authRouter.post(
  "/login",
  schemaValidator(loginSchema),
  generalErrorctaher(login)
);
authRouter.post("/refresh", generalErrorctaher(refresh));
authRouter.post("/logout", generalErrorctaher(logout));

export default authRouter;
