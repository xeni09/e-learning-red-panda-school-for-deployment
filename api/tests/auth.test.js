const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
require("dotenv").config(); // Cargar variables de entorno

describe("Auth Routes", () => {
  test("should login successfully with valid credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: process.env.ADMIN_EMAIL, // Usa la variable de entorno
      password: process.env.ADMIN_PASSWORD2, // Usa la variable de entorno
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["set-cookie"]).toBeDefined();
  });

  test("should fail login with invalid credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: process.env.ADMIN_EMAIL,
      password: "wrongpassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("error");
  });
});

// Coloca `afterAll` fuera del bloque `describe`
afterAll(async () => {
  await mongoose.connection.close();
});
