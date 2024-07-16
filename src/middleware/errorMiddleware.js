const errorMiddleware = (error, req, res, next) => {
  console.error(error.stack); // Log the error stack for debugging purposes

  res.status(500).json({ message: error.message });
};

export default errorMiddleware;
