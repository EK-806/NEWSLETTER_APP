import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        mainImage: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        intro: {
            type: String,
            required: true,
        },
        paragraphOneImage: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        paragraphOneDescription: {
            type: String,
        },
        paragraphOneTitle: {
            type: String,
        },
        paragraphTwoImage: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        paragraphTwoDescription: {
            type: String,
        },
        paragraphTwoTitle: {
            type: String,
        },
        paragraphThreeImage: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        paragraphThreeDescription: {
            type: String,
        },
        paragraphThreeTitle: {
            type: String,
        },
        category: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        authorUserName: {
            type: String,
            required: true,
        },
        authorProfilePicture: {
            type: String,
            required: true,
        },
        published: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps: true,
    }
);

export const Post = mongoose.model("Post", postSchema);