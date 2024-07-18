export const roleCheck = (targetRoles) => {
  return function roleCheckMiddleWare(req, res, next) {
    // if the targetRoles is not an array, make it an array; this is important, because if there is only one role that is required, the targetRoles could be a string instead of an array
    if (!Array.isArray(targetRoles)) {
      targetRoles = [targetRoles];
    }

    // check, if the role of the user is in the targetRoles array
    if (!targetRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have the required permissions" });
      // I decided to write message instead of error, because it is acutally not an error if someone tries to access a route without the required permissions
    } else {
      next(); // if the user has the required permissions, the next middleware will be called
    }
  };
};
