import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import User from "../src/models/User.js";
process.env.JWT_SECRET = "secretkey";

beforeAll(async () => {
  // connect to test db (local mongo)
  await mongoose.connect("mongodb://127.0.0.1:27017/userdb1");
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Authentication & RBAC Tests", () => {
  let userToken;

  // 1️⃣ Signup success
  it("should signup a new user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Test User",
        email: "testuser@test.com",
        password: "Test@123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  // 2️⃣ Login success
  it("should login with correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@test.com",
        password: "Test@123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    userToken = res.body.token;
  });

  // 3️⃣ Login failure
  it("should fail login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@test.com",
        password: "WrongPass",
      });

    expect(res.statusCode).toBe(401);
  });

  // 4️⃣ Protected route without token
  it("should block access to protected route without token", async () => {
    const res = await request(app).get("/api/users/me");
    expect(res.statusCode).toBe(401);
  });

  // 5️⃣ Admin route blocked for normal user
  it("should block admin route for non-admin user", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });
});
