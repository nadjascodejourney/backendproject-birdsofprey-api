export const roleCheck = (targetRole) => {
  return function roleCheckMiddleWare(req, res, next) {
    if (req.user.role !== targetRole) {
      return res
        .status(403)
        .json({ message: "You do not have the required permissions" });
      // I decided to write message instead of error, because it is acutally not an error if someone tries to access a route without the required permissions
    } else {
      next(); // if the user has the required permissions, the next middleware will be called
    }
  };
};
