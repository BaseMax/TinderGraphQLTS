import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { SignupInput } from "./dto/signup.dto";
import { LoginInput } from "./dto/login.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "src/user/interfaces/user.document";
import { UserService } from "src/user/user.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interfaces/jwt.payload";
import { AuthPayload } from "./entities/auth.entity";
import * as argon2 from "argon2";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel("users") private userModel: Model<UserDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signup(signupInput: SignupInput): Promise<AuthPayload | undefined> {
    const userExists = await this.userService.findByEmail(signupInput.email);

    if (userExists)
      throw new BadRequestException(
        "user with this email exists,please login..."
      );

    const user = await this.userService.create(signupInput);

    const jwtPayload: JwtPayload = { name: user.name, sub: user._id };
    const token = this.getToken(jwtPayload);

    return { token, name: user.name };
  }

  async login(loginInput: LoginInput): Promise<AuthPayload | undefined> {
    const user = await this.userService.findByEmailOrThrow(loginInput.email);
    await this.validatePassword(user.password, loginInput.password);
    const jwtPayload: JwtPayload = { name: user.name, sub: user._id };
    const token = this.getToken(jwtPayload);
    return { token, name: user.name };
  }

  async validatePassword(hashedPassword: string, password: string) {
    const isValidPassword = await argon2.verify(hashedPassword, password);
    if (!isValidPassword)
      throw new ForbiddenException("the provided credentials aren't correct");
  }
  getToken(jwtPayload: JwtPayload): string {
    return this.jwtService.sign(jwtPayload);
  }
}
