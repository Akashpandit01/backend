const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {

let token;

test("User can signup", async () => {

const res = await request(app)
.post("/auth/signup")
.send({
email: "test@mail.com",
password: "123456"
});

expect(res.statusCode).toBe(201);

});

test("User can login and receive JWT", async () => {

const res = await request(app)
.post("/auth/login")
.send({
email: "test@mail.com",
password: "123456"
});

token = res.body.token;

expect(res.statusCode).toBe(200);
expect(token).toBeDefined();

});

test("Login fails for invalid credentials", async () => {

const res = await request(app)
.post("/auth/login")
.send({
email: "test@mail.com",
password: "wrongpass"
});

expect(res.statusCode).toBe(401);

});

test("Access protected route without token", async () => {

const res = await request(app)
.get("/todos");

expect(res.statusCode).toBe(401);

});

test("Access protected route with invalid token", async () => {

const res = await request(app)
.get("/todos")
.set("Authorization", "Bearer wrongtoken");

expect(res.statusCode).toBe(401);

});

});