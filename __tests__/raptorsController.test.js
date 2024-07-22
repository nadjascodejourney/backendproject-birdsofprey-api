import supertest from "supertest";
import mongoose from "mongoose";

import { Raptor } from "../src/models/raptorModel.js";

import { app } from "../server.js";

// Testdata
const testData = [
  { name: "Raptor 1", species: "Species A" },
  { name: "Raptor 2", species: "Species B" },
];

beforeEach(async () => {
  await Raptor.deleteMany({});
  await Raptor.insertMany(testData);
});

afterEach(async () => {
  await Raptor.deleteMany({});
});

describe("GET /raptors", () => {
  it("should get all raptors", async () => {
    const response = await request(app).get("/raptors");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(testData.length);
  });
});

describe("POST /raptors", () => {
  it("should add a new raptor", async () => {
    const newRaptor = { name: "New Raptor", species: "New Species" };

    const response = await request(app).post("/raptors").send(newRaptor);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newRaptor.name);
    expect(response.body.species).toBe(newRaptor.species);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
