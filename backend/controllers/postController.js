import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Post } from "../models/postSchema.js";
import cloudinary from "cloudinary";

export const createPost = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Post Main Image Is Mandatory!", 400));
    }
    const {
        mainImage,
        paragraphOneImage,
        paragraphTwoImage,
        paragraphThreeImage,
    } = req.files;

    if (!mainImage) {
        return next(new ErrorHandler("Post Main Image Is Mandatory!", 400));
    }
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (
        !allowedFormats.includes(mainImage.mimetype) ||
        (paragraphOneImage &&
            !allowedFormats.includes(paragraphOneImage.mimetype)) ||
        (paragraphTwoImage &&
            !allowedFormats.includes(paragraphTwoImage.mimetype)) ||
        (paragraphThreeImage &&
            !allowedFormats.includes(paragraphThreeImage.mimetype))
    ) {
        return next(
            new ErrorHandler(
                "Invalid file type. Only JPG, PNG and WEBP Formats Are Allowed!",
                400
            )
        );
    }
    const {
        title,
        intro,
        paragraphOneDescription,
        paragraphOneTitle,
        paragraphTwoDescription,
        paragraphTwoTitle,
        paragraphThreeDescription,
        paragraphThreeTitle,
        category,
        published,
    } = req.body;

    const createdBy = req.user._id;
    const authorUserName = req.user.userName;
    const authorProfilePicture = req.user.profilePicture.url;

    if (!title || !category || !intro) {
        return next(
            new ErrorHandler(
                "Title, Intro and Category Are Required Fields!",
                400
            )
        );
    }

    const postPublished = published === undefined ? true : published;

    const uploadPromises = [
        cloudinary.uploader.upload(mainImage.tempFilePath),
        paragraphOneImage
            ? cloudinary.uploader.upload(paragraphOneImage.tempFilePath)
            : Promise.resolve(null),
        paragraphTwoImage
            ? cloudinary.uploader.upload(paragraphTwoImage.tempFilePath)
            : Promise.resolve(null),
        paragraphThreeImage
            ? cloudinary.uploader.upload(paragraphThreeImage.tempFilePath)
            : Promise.resolve(null),
    ];

    const [
        mainImageRes,
        paragraphOneImageRes,
        paragraphTwoImageRes,
        paragraphThreeImageRes,
    ] = await Promise.all(uploadPromises);

    if (
        !mainImageRes ||
        mainImageRes.error ||
        (paragraphOneImage &&
            (!paragraphOneImageRes || paragraphOneImageRes.error)) ||
        (paragraphTwoImage &&
            (!paragraphTwoImageRes || paragraphTwoImageRes.error)) ||
        (paragraphThreeImage &&
            (!paragraphThreeImageRes || paragraphThreeImageRes.error))
    ) {
        return next(
            new ErrorHandler(
                "An error occurred while uploading one or more images!",
                500
            )
        );
    }
    const postData = {
        title,
        intro,
        paragraphOneDescription,
        paragraphOneTitle,
        paragraphTwoDescription,
        paragraphTwoTitle,
        paragraphThreeDescription,
        paragraphThreeTitle,
        category,
        createdBy,
        authorProfilePicture,
        authorUserName,
        published: postPublished,
        mainImage: {
            public_id: mainImageRes.public_id,
            url: mainImageRes.secure_url,
        },
    };
    if (paragraphOneImageRes) {
        postData.paragraphOneImage = {
            public_id: paragraphOneImageRes.public_id,
            url: paragraphOneImageRes.secure_url,
        };
    }
    if (paragraphTwoImageRes) {
        postData.paragraphTwoImage = {
            public_id: paragraphTwoImageRes.public_id,
            url: paragraphTwoImageRes.secure_url,
        };
    }
    if (paragraphThreeImageRes) {
        postData.paragraphThreeImage = {
            public_id: paragraphThreeImageRes.public_id,
            url: paragraphThreeImageRes.secure_url,
        };
    }
    const post = await Post.create(postData);
    res.status(200).json({
        success: true,
        message: "Post Uploaded!",
        post,
    });
});

export const deletePost = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
        return next(new ErrorHandler("Post not found!", 404));
    }
    await post.deleteOne();
    res.status(200).json({
        success: true,
        message: "Post deleted!",
    });
});

export const getAllPosts = catchAsyncErrors(async (req, res, next) => {
    const allPosts = await Post.find({ published: true });
    res.status(200).json({
        success: true,
        allPosts,
    });
});

export const searchByTitle = catchAsyncErrors(async (req, res, next) => {
    const { title } = req.params;
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title search query is required.",
        });
    }

    const posts = await Post.find({
        title: { $regex: title, $options: "i" },
    });
    res.status(200).json({
        success: true,
        posts,
    });
});

export const searchByCategory = catchAsyncErrors(async (req, res, next) => {
    const { category } = req.params;
    if (!category) {
        return res.status(400).json({
            success: false,
            message: "Category is required for search.",
        });
    }
    const posts = await Post.find({ category: new RegExp(category, "i") });
    res.status(200).json({
        success: true,
        posts,
    });
});

export const searchByAuthorUserName = catchAsyncErrors(
    async (req, res, next) => {
        const { authorUserName } = req.params;
        const posts = await Post.find({ authorUserName });
        res.status(200).json({
            success: true,
            posts,
        });
    }
);

export const getSinglePost = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
        return next(new ErrorHandler("Post not found!", 404));
    }
    res.status(200).json({
        success: true,
        post,
    });
});

export const getMyPosts = catchAsyncErrors(async (req, res, next) => {
    const createdBy = req.user._id;
    const posts = await Post.find({ createdBy });
    res.status(200).json({
        success: true,
        posts,
    });
});

export const updatePost = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let post = await Post.findById(id);
    if (!post) {
        return next(new ErrorHandler("Post not found!", 404));
    }
    const newPostData = {
        title: req.body.title,
        intro: req.body.intro,
        category: req.body.category,
        paragraphOneTitle: req.body.paragraphOneTitle,
        paragraphOneDescription: req.body.paragraphOneDescription,
        paragraphTwoTitle: req.body.paragraphTwoTitle,
        paragraphTwoDescription: req.body.paragraphTwoDescription,
        paragraphThreeTitle: req.body.paragraphThreeTitle,
        paragraphThreeDescription: req.body.paragraphThreeDescription,
        published: req.body.published === undefined ? true : req.body.published,
    };
    if (req.files) {
        const {
            mainImage,
            paragraphOneImage,
            paragraphTwoImage,
            paragraphThreeImage,
        } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (
            (mainImage && !allowedFormats.includes(mainImage.mimetype)) ||
            (paragraphOneImage &&
                !allowedFormats.includes(paragraphOneImage.mimetype)) ||
            (paragraphTwoImage &&
                !allowedFormats.includes(paragraphTwoImage.mimetype)) ||
            (paragraphThreeImage &&
                !allowedFormats.includes(paragraphThreeImage.mimetype))
        ) {
            return next(
                new ErrorHandler(
                    "Invalid file format. Only PNG, JPG and WEBp formats are allowed.",
                    400
                )
            );
        }
        if (req.files && mainImage) {
            const postMainImageId = post.mainImage.public_id;
            await cloudinary.uploader.destroy(postMainImageId);
            const newPostMainImage = await cloudinary.uploader.upload(
                mainImage.tempFilePath
            );
            newPostData.mainImage = {
                public_id: newPostMainImage.public_id,
                url: newPostMainImage.secure_url,
            };
        }

        if (req.files && paragraphOneImage) {
            if (post.paragraphOneImage && post.paragraphOneImage.public_id) {
                const postParagraphOneImageId =
                    post.paragraphOneImage.public_id;
                await cloudinary.uploader.destroy(postParagraphOneImageId);
            }
            const newPostParagraphOneImage = await cloudinary.uploader.upload(
                paragraphOneImage.tempFilePath
            );
            newPostData.paragraphOneImage = {
                public_id: newPostParagraphOneImage.public_id,
                url: newPostParagraphOneImage.secure_url,
            };
        }
        if (req.files && paragraphTwoImage) {
            if (post.paragraphTwoImage && post.paragraphTwoImage.public_id) {
                const postParagraphTwoImageId =
                    post.paragraphTwoImage.public_id;
                await cloudinary.uploader.destroy(postParagraphTwoImageId);
            }
            const newPostParagraphTwoImage = await cloudinary.uploader.upload(
                paragraphTwoImage.tempFilePath
            );
            newPostData.paragraphTwoImage = {
                public_id: newPostParagraphTwoImage.public_id,
                url: newPostParagraphTwoImage.secure_url,
            };
        }
        if (req.files && paragraphThreeImage) {
            if (
                post.paragraphThreeImage &&
                post.paragraphThreeImage.public_id
            ) {
                const postParagraphThreeImageId =
                    post.paragraphThreeImage.public_id;
                await cloudinary.uploader.destroy(postParagraphThreeImageId);
            }
            const newPostParagraphThreeImage = await cloudinary.uploader.upload(
                paragraphThreeImage.tempFilePath
            );
            newPostData.paragraphThreeImage = {
                public_id: newPostParagraphThreeImage.public_id,
                url: newPostParagraphThreeImage.secure_url,
            };
        }
    }
    post = await Post.findByIdAndUpdate(id, newPostData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Post Updated!",
        post,
    });
});