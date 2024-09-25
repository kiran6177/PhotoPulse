import { emailRegex, mobileRegex, passwordRegex } from "../common/constants.js";
import { CustomError } from "../common/CustomError.js";
import { compare, hash } from "bcrypt";
import UserModel from "../models/userModel.js";
import { createRefreshToken, createToken } from "../utils/jwt.js";
const SALT_ROUNDS = 10;

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email?.trim() === "" && password?.trim() === "") {
      throw CustomError.createError("Please fill up the fields!!", 400);
    }

    if (email?.trim() === "") {
      throw CustomError.createError("Please enter a email!!", 400);
    }

    if (!emailRegex.test(email)) {
      throw CustomError.createError("Please enter a valid email!!", 400);
    }

    if (password?.trim() === "") {
      throw CustomError.createError("Please enter a password!!", 400);
    }

    if (password?.trim().length < 8) {
      throw CustomError.createError(
        "Password should contain minimum 8 digits!!",
        400
      );
    }

    if (!passwordRegex.test(password)) {
      throw CustomError.createError(
        "Password should contain alphabets and digits!!",
        400
      );
    }

    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      throw CustomError.createError("User Not Found!!", 400);
    }
    const isUser = await compare(password, findUser.password);
    if (!isUser) {
      throw CustomError.createError("Invalid Password!!", 400);
    }

    const userData = {
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      mobile: findUser.mobile,
      designation: findUser.designation,
    };

    const access_token = await createToken({ _id: userData._id });
    const refresh_token = await createRefreshToken({ _id: userData._id });

    res.cookie("token", access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 1000, //1 min
    });

    res.cookie("refresh", refresh_token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    res.json({ user: userData });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, mobile, password, cPassword } = req.body;
    if (
      name?.trim() === "" &&
      email?.trim() === "" &&
      mobile?.trim() === "" &&
      password?.trim() === "" &&
      cPassword?.trim() === ""
    ) {
      throw CustomError.createError("Please fill up the fields!!", 400);
    }

    if (email?.trim() === "") {
      throw CustomError.createError("Please enter a email!!", 400);
    }

    if (!emailRegex.test(email)) {
      throw CustomError.createError("Please enter a valid email!!", 400);
    }

    if (mobile?.trim() === "") {
      throw CustomError.createError("Please enter a mobile number!!", 400);
    }

    if (mobile?.length !== 10) {
      throw CustomError.createError("Please enter a 10 digit mobile number!!", 400);
    }

    if (!mobileRegex.test(mobile)) {
      throw CustomError.createError("Please enter a valid mobile number!!", 400);
    }

    if (password?.trim() === "") {
      throw CustomError.createError("Please enter a password!!", 400);
    }

    if (password?.trim().length < 8) {
      throw CustomError.createError(
        "Password should contain minimum 8 digits!!",
        400
      );
    }

    if (!passwordRegex.test(password)) {
      throw CustomError.createError(
        "Password should contain alphabets and digits!!",
        400
      );
    }

    if (cPassword?.trim() === "") {
      throw CustomError.createError("Please Confirm your password!!", 400);
    }

    if (password?.trim() !== cPassword?.trim()) {
      throw CustomError.createError("Password Mismatch!!", 400);
    }

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      throw CustomError.createError("Account Exists!!", 400);
    }
    console.log(name, email,mobile, password, cPassword);
    const hashed = await hash(password, SALT_ROUNDS);
    const userData = {
      name,
      email,
      mobile:parseInt(mobile),
      password: hashed,
    };

    const createdUser = await UserModel.create(userData);
    console.log(createdUser);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      secure: true,
      maxAge: 1000, //1 min
    });

    res.cookie("refresh", null, {
      httpOnly: true,
      secure: true,
      maxAge: 1000, //30 days
    });
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const editProfile = async (req, res, next) => {
  try {
    const { name, email ,mobile} = req.body;
    const { _id } = req.user;
    if (name?.trim() === "" && email?.trim() === "") {
      throw CustomError.createError("Please fill up the fields!!", 400);
    }

    if (email?.trim() === "") {
      throw CustomError.createError("Please enter a email!!", 400);
    }

    if (!emailRegex.test(email)) {
      throw CustomError.createError("Please enter a valid email!!", 400);
    }

    if (mobile?.trim() === "") {
      throw CustomError.createError("Please enter a mobile number!!", 400);
    }

    if (mobile?.length !== 10) {
      throw CustomError.createError("Please enter a 10 digit mobile number!!", 400);
    }

    if (!mobileRegex.test(mobile)) {
      throw CustomError.createError("Please enter a valid mobile number!!", 400);
    }

    const userExist = await UserModel.findOne({ _id });

    if (!userExist) {
      throw CustomError.createError("Invalid Request!!", 400);
    }
    console.log(name, email, mobile);

    const userData = {
      name,
      email,
      mobile
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id },
      { $set: userData },
      { new: true }
    );
    console.log(updatedUser);
    const { password, __v, ...rest } = updatedUser.toObject();
    res.json({ success: rest });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oPassword, newPass } = req.body;
    const { _id } = req.user;
    if (oPassword?.trim() === "" && newPass?.trim() === "") {
      throw CustomError.createError("Please fill up the fields!!", 400);
    }

    if (newPass?.trim() === "") {
      throw CustomError.createError("Please enter new password!!", 400);
    }

    if (newPass?.trim().length < 8) {
      throw CustomError.createError(
        "Password should contain minimum 8 digits!!",
        400
      );
    }

    if (!passwordRegex.test(newPass)) {
      throw CustomError.createError(
        "Password should contain alphabets and digits!!",
        400
      );
    }

    const userExist = await UserModel.findOne({ _id });

    if (!userExist) {
      throw CustomError.createError("Invalid User!!", 400);
    }
    const isValidPass = await compare(oPassword, userExist.password);
    if (!isValidPass) {
      throw CustomError.createError("Invalid Old Password!!", 400);
    }
    const hashed = await hash(newPass, SALT_ROUNDS);
    const userData = {
      password: hashed,
    };
    await UserModel.findByIdAndUpdate({ _id }, { $set: userData });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
