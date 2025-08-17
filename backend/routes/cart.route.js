import express from "express";
import { removeFromCart } from "../controllers/CartController.js";

const router = express.Router();

// DELETE route
router.delete("/removeFromCart/:id", removeFromCart);

export default router;
