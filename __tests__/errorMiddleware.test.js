import request from "supertest";
import server from "../server.js";

describe("Error middleware", () => {
  it("should handle errors and return a 500 status with an error message", async () => {
    const response = await request(server).get("/error"); // Trigger the error route
  });

  expect(response.status).toBe(500);
  expect(response.body).toEqual({ message: "Test error" });
});
