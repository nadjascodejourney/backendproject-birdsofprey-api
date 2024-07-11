import mongoose from "mongoose";
import { connectDB } from "../src/config/connectDB.js";

// Mocking mongoose.connect() to avoid actual database connection during testing
jest.mock("mongoose"); // a mock is a fake function that can be used to replace real functions in our tests

describe("connectDB function", () => {
  // describe() is a Jest function that groups tests together, it takes two arguments: a string and a function; the string is the name of the test group, and the function is the test suite
  afterEach(() => {
    // This function will run after each test
    jest.restoreAllMocks(); // Restore all mocks after each test
  });

  // it() is a jest function that defines a test, it takes two arguments: a string and a function; the string is the name of the test, and the function is the test itself
  it("should connect to the database with provided URL", async () => {
    // async and not synchronous, because the function which is to be tested, is not immediately returning a value
    const mockUrl = "valid-url"; //! put in the valid URL for Testing, but do not upload to GitHub
    const mockConnection = {}; // Mocked connection object to be returned by mongoose.connect(); we need this to mock the return value of mongoose.connect()

    mongoose.connect.mockResolvedValue(mockConnection);
    // Mock mongoose.connect() to return mockConnection when called
    // mockResolvedValue() is a Jest function that mocks a resolved promise; it takes one argument, which is the value to be returned when the mocked function is called; in this case the object we created above

    await connectDB(mockUrl); // Call the function we want to test

    expect(mongoose.connect).toHaveBeenCalledTimes(1); // Ensure mongoose.connect() was called exactly once
    expect(mongoose.connect).toHaveBeenCalledWith(mockUrl); // Ensure mongoose.connect() was called with the correct URL
  });

  it("should handle connection errors and exit the process", async () => {
    const mockUrl = "invalid-url"; // Provide an invalid URL to simulate connection error
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    // spyOn takes in 2 args: the first is an object and the second is a string; the object is the object we want to spy on, and the string is the name of the method we want to spy on
    // mockImplementation() is a Jest function that mocks the implementation of a function; it takes one argument, which is the function to be called when the mocked function is called; in this case an empty function
    // Mock process.exit()

    mongoose.connect.mockRejectedValue(new Error("Connection failed"));

    await connectDB(mockUrl);

    expect(mongoose.connect).toHaveBeenCalledTimes(1);

    expect(mongoose.connect).toHaveBeenCalledWith(mockUrl);

    expect(mockExit).toHaveBeenCalledWith(1); // expect() is a Jest function that asserts something about a value; it takes one argument, which is the value to be tested, then another function is chained. In this case, we are testing if the mockExit function was called with the argument 1
  });
});
