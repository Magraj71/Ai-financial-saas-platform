import { Router } from "express";
import Stripe from "stripe";
import { Env } from "../config/env.config";
import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
import { BadRequestException } from "../utils/app-error";

const router = Router();

// const stripe = new Stripe(Env.STRIPE_SECRET_KEY, {
//   apiVersion: "2024-06-20",
// });

// // POST /api/subscription/create-checkout-session
// router.post(
//   "/create-checkout-session",
//   asyncHandler(async (req, res) => {
//     const { priceId } = req.body;

//     if (!priceId) {
//       throw new BadRequestException("Missing priceId");
//     }

//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",
//       payment_method_types: ["card"],
//       line_items: [{ price: priceId, quantity: 1 }],
//       success_url: Env.FRONTEND_SUCCESS_URL,
//       cancel_url: Env.FRONTEND_CANCEL_URL,
//     });

//     res.json({ checkoutUrl: session.url });
//   })
// );

export default router;
