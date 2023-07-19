import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import * as argon2 from "argon2";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let userModel: Model<any>;
  let userTest = {
    email: "test@gmail.com",
    password: "test",
    name: "john",
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userModel = app.get<Model<any>>(getModelToken("users"));
    await userModel.deleteMany({});
    await userModel.create({
      email: "test@gmail.com",
      password: await argon2.hash("test"),
      name: "john",
    });
    await app.init();
  });

  afterEach(async () => {});

  afterAll(async () => {
    await userModel.deleteMany({});
    await app.close();
  });

  async function login(): Promise<string> {
    const mutation = `
    mutation Login {
      login(loginInput: {email: "test@gmail.com", password: "test"}) {
          token
          name
      }
  }
  `;

    const response = await request(app.getHttpServer()).post("/graphql").send({
      query: mutation,
    });

    return response.body.data.login.token;
  }

  describe("auth", () => {
    it("should signup", async () => {
      const mutation = `mutation Signup {
        signup(
            signupInput: {email: "test2@gmail.com", password: "test", name: "john smith"}
        ) {
            token
            name
        }
    }
    
    `;

      const response = await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: mutation,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.signup.name).toBe("john smith");
    });

    it("should login", async () => {
      const mutation = `
      mutation Login {
        login(loginInput: {email: "test@gmail.com", password: "test"}) {
            token
            name
        }
    }
    `;

      const response = await request(app.getHttpServer())
        .post("/graphql")
        .send({
          query: mutation,
        });

      console.log(response.body.data);

      expect(response.status).toBe(200);
    });
  });

  describe("match", () => {
    it("should create", async () => {
      const token = await login();
      const mutation = `mutation CreateMatch {
        createMatch(createMatchInput: {secondUser: "64b4f2057e7faf243e8c19bd"}) {
            firstUserId
            secondUserId
            _id
        }
    }
    `;

      const response = await request(app.getHttpServer())
        .post("/graphql")
        .set("Authorization", token)
        .send({
          query: mutation,
        });

      expect(response.status).toBe(200);
    });
  });
});
