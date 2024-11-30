import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, "Name must contain at least 3 character!"],
        maxLength: [12, "Name can't exceed 30 character!"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    phone: {
        type: Number,
        required: true,
    },
    profilePicture: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        required: true,
        enum: ["Reader", "Author"],
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 character!"],
        maxLength: [16, "Password cannot exceed 30 character!"],
        select: false,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchema);