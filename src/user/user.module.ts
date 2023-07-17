import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./dto/create-user.input";
import { AuthModule } from "src/auth/auth.module";
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "users",
        schema: UserSchema,
      },
    ]),
    AuthModule,
  ],
  providers: [
    UserResolver,
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
