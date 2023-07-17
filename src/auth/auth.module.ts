import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/user/dto/create-user.input";
import { UserService } from "src/user/user.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "./guards/jwt.auth.guard";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "users",
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow("SECRET_KEY"),
        signOptions: { expiresIn: "1d" },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, UserService, JwtAuthGuard],
  exports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow("SECRET_KEY"),
        signOptions: { expiresIn: "1d" },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
