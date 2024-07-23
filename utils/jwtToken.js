import RefreshToken from "../models/refreshTokenSchema.js";

export const sendToken = async(user, statusCode, res, message) => {
  const accessToken = user.getJWTToken();
  const refreshToken = user.getRefreshToken();
  const accessOptions = {
      expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE)* 60 * 60 * 1000), 
      httpOnly: true, 
  };

  const refreshOptions = {
      expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE)* 60 * 60 * 1000), 
      httpOnly: true, 
  };

  try {
    const existingToken = await RefreshToken.findOne({ userId: user._id });
    if (existingToken) {
      existingToken.expiredAt = new Date();
      await existingToken.save();
      await RefreshToken.deleteOne({ _id: existingToken._id });
    }
      await RefreshToken.create({ userId: user._id, token: refreshToken });
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

  // Send both access token and refresh token in cookies
  res.status(statusCode)
      .cookie("access_token", accessToken, accessOptions)
      .cookie("refresh_token", refreshToken, refreshOptions)
      .json({
          success: true,
          user,
          message,
          access_token: accessToken,
          refresh_token: refreshToken,
      });
};
