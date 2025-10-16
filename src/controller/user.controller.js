import asyncHandler from "../utils/asyncHandler.js";

//register user
const registerUser = asyncHandler(async (req, res) => {
  //if body is not have empty
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ApiError(400, "Request body cannot be empty");
  }

  const { name, email, password } = req.body;

  if ([name, email, password].some((feild) => feild?.trim() === "")) {
    throw new ApiError(400, "All feild are required");
  }

  const userExist = await UserModel.findOne({
    where: { email: email },
  });

  if (userExist) {
    throw new ApiError(409, "User is allready exist");
  }

  const newUser = await UserModel.create({
    name: name,
    email: email,
    password: password,
  });

  if (!newUser) {
    throw ApiError(400, "Somthing went wrong, user was not creating");
  }

  return res.status(200).json(new ApiResponse(200, "user is created"));
});

// login user

const userLogin = asyncHandler(async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  // Checking the email, password
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(404, "email, password is need for the login");
  }

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    throw new ApiError(404, "email is not availble");
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid password");
  }

  const accessAndRefreshToken = await user.generateAccessToken();

  const { accessToken, refreshToken } = accessAndRefreshToken;
  const logedInUser = await User.findById(user._id).select(
    "-password, -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, option)
    .cookie("accessToken", accessToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: logedInUser,
          accessToken,
          refreshToken,
        },
        "user login successfully"
      )
    );
});

export { registerUser };
