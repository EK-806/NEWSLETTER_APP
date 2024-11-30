import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const register = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("User Profile Picture Required!", 400));
    }

    const { profilePicture } = req.files;

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(profilePicture.mimetype)) {
        return next(
            new ErrorHandler(
                "Invalid file type. Please provide your Profile Picture in png, jpg, or webp format.",
                400
            )
        );
    }

    const { userName, email, password, phone, role } = req.body;

    if (
        !userName ||
        !email ||
        !password ||
        !phone ||
        !role ||
        !profilePicture
    ) {
        return next(new ErrorHandler("All fields are required!", 400));
    }

    if (userName.length < 3) {
        return next(
            new ErrorHandler(
                "Username must be at least 3 characters long!",
                400
            )
        );
    }

    if (userName.length > 12) {
        return next(
            new ErrorHandler("Username can't exceed 12 characters!", 400)
        );
    }

    let user = await User.findOne({
        $or: [{ userName }, { email }],
    });

    if (user) {
        if (user.userName === userName) {
            return next(new ErrorHandler("Username already taken!", 400));
        }
        if (user.email === email) {
            return next(new ErrorHandler("Email already registered!", 400));
        }
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        profilePicture.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary error:",
            cloudinaryResponse.error || "Unknown cloudinary error!"
        );
    }

    user = await User.create({
        userName,
        email,
        password,
        phone,
        role,
        profilePicture: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    sendToken(user, 200, "User successfully registered!", res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("All fields are required!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(
            new ErrorHandler("Invalid password or email address!", 400)
        );
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid password or email address", 400));
    }

    if (user.role !== role) {
        return next(
            new ErrorHandler(`User with that role(${role}) can't be found`, 400)
        );
    }

    sendToken(user, 200, "User successfully logged in!", res);
});

export const logout = catchAsyncErrors((req, res, next) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "User logged out!",
        });
});

export const getMyProfile = catchAsyncErrors((req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const getAllAuthors = catchAsyncErrors(async (req, res, next) => {
    const authors = await User.find({ role: "Author" });
    res.status(200).json({
        success: true,
        authors,
    });
});