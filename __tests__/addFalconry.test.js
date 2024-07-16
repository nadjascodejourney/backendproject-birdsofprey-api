import mongoose from "mongoose";
import { falconryZValidation } from "../src/utils/falconryZValidation.js";
import { addFalconry } from "../src/controllers/falconriesController";
import { Falconry } from "../src/models/falconryModel.js";

jest.mock("../src/utils/falconryZValidation.js");

describe("Controller Test Post", () => {
  describe("addFalconry", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should add a new falconry", async () => {
      const req = {
        body: {
          falconry_name: "Test Falconry",
          falconry_address: {
            street: "123 Test Street",
            city: "Test City",
            state: "Test State",
            country: "Test Country",
          },
          numberOfRaptors: 5,
          numberOfEmployees: 2,
          falconry_email: "test@example.com",
          raptors: [],
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(), // mockReturnThis() is a Jest function that mocks the return value of the function it is chained to; it returns the object it is called on; fn() is a Jest function that creates a mock function
        json: jest.fn(),
      };

      const next = jest.fn();

      // Mocking the validation function
      falconryZValidation.parse.mockReturnValueOnce(req.body);

      // Mocking the save method of Falconry
      Falconry.prototype.save = jest.fn().mockResolvedValueOnce({
        _id: expect.any(String),
        ...req.body,
      });

      await addFalconry(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: expect.any(String),
          falconry_name: "Test Falconry",
          falconry_address: {
            street: "123 Test Street",
            city: "Test City",
            state: "Test State",
            country: "Test Country",
          },
          numberOfRaptors: 5,
          numberOfEmployees: 2,
          falconry_email: "test@example.com",
          raptors: [],
        })
      );
      expect(next).not.toHaveBeenCalled();
    });
  });
});
