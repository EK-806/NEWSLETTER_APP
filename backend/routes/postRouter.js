import express from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getMyPosts,
    getSinglePost,
    updatePost,
    searchByTitle,
    searchByCategory,
    searchByAuthorUserName,
} from "../controllers/postController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAuthorized("Author"), createPost);
router.delete(
    "/delete/:id",
    isAuthenticated,
    isAuthorized("Author"),
    deletePost
);
router.put("/update/:id", isAuthenticated, isAuthorized("Author"), updatePost);
router.get("/all", getAllPosts);
router.get("/singlepost/:id", isAuthenticated, getSinglePost);
router.get("/search/title/:title", searchByTitle);
router.get("/search/category/:category", searchByCategory);
router.get("/search/author/:authorUserName", searchByAuthorUserName);
router.get("/myposts", isAuthenticated, isAuthorized("Author"), getMyPosts);

export default router;