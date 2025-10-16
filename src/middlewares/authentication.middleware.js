import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const authenticatUser = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; //get the token to request header
  if (!token) {
    throw new ApiError(401, "Access denied. No token provided.");
  }
  console.log(`token ..................${token}`);

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decode) {
      throw new ApiError(401, "Access denied. token not verify");
    }
    return next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
});

export { authenticatUser };
