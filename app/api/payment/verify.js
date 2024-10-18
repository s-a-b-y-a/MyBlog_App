import Razorpay from "razorpay";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Payment is verified
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
