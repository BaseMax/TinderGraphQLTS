import { BadRequestException, Injectable, UseGuards } from "@nestjs/common";
import { UpdateUserInput } from "./dto/update-user.input";
import { SignupInput } from "src/auth/dto/signup.dto";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Mongoose } from "mongoose";
import { UserDocument } from "./interfaces/user.document";
import * as argon2 from "argon2";
import { SearchInput } from "./dto/search.user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel("users") private userModel: Model<UserDocument>) {}
  async create(signupInput: SignupInput): Promise<UserDocument> {
    return await this.userModel.create({
      ...signupInput,
      password: await argon2.hash(signupInput.password),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email });
  }

  async findByEmailOrThrow(email: string): Promise<UserDocument | undefined> {
    const user = await this.findByEmail(email);

    if (!user)
      throw new BadRequestException(
        "user with provided credentials doesn't exist"
      );

    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find({});
  }
  async update(
    userId: string,
    updateUserInput: UpdateUserInput
  ): Promise<UserDocument> {
    let { password } = updateUserInput;

    if (password) {
      updateUserInput.password = await argon2.hash(password);
    }

    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      {
        $set: updateUserInput,
      },
      { new: true }
    );

    return updatedUser;
  }

  async remove(userId: string): Promise<UserDocument> {
    return await this.userModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(userId),
    });
  }

  async searchUser(searchUserDto: SearchInput) {
    const operations = [];

    if (searchUserDto.age) {
      operations.push({
        age: {
          $gt: searchUserDto.age,
          $lt: searchUserDto.age + 10,
        },
      });
    }

    if (searchUserDto.interests && searchUserDto.interests.length > 0) {
      operations.push({
        interests: { $all: searchUserDto.interests },
      });
    }

    if (searchUserDto.location) {
      operations.push({
        location: { $regex: searchUserDto.location, $options: "i" },
      });
    }

    return await this.userModel.find({
      $or: operations,
    });
  }
}
