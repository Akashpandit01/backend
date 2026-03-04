const request = require("supertest");
const app = require("../src/app");

let token;
let todoId;

beforeAll(async () => {

await request(app)
.post("/auth/signup")
.send({
email: "todo@mail.com",
password: "123456"
});

const res = await request(app)
.post("/auth/login")
.send({
email: "todo@mail.com",
password: "123456"
});

token = res.body.token;

});

test("Create Todo", async () => {

const res = await request(app)
.post("/todos")
.set("Authorization", `Bearer ${token}`)
.send({
title: "Test Todo",
description: "Test Desc"
});

todoId = res.body._id;

expect(res.statusCode).toBe(201);

});

test("Get Todos", async () => {

const res = await request(app)
.get("/todos")
.set("Authorization", `Bearer ${token}`);

expect(res.statusCode).toBe(200);
expect(res.body.length).toBeGreaterThan(0);

});

test("Update Todo", async () => {

const res = await request(app)
.put(`/todos/${todoId}`)
.set("Authorization", `Bearer ${token}`)
.send({
status: "completed"
});

expect(res.body.status).toBe("completed");

});

test("Delete Todo", async () => {

const res = await request(app)
.delete(`/todos/${todoId}`)
.set("Authorization", `Bearer ${token}`);

expect(res.statusCode).toBe(200);

});

});