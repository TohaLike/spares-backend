import { Router } from "express";
import { apiController } from "../controllers/api.controller.js";

const router = new Router();

router.post("/auth", apiController.auth)
router.get("/search/:code", apiController.getDetails)

export const routers = router