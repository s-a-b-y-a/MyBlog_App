import Razorpay from "razorpay";

// Handle POST requests
export async function POST(req) {
  try {
    const { plan } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Define pricing plans
    const prices = {
      basic: 1000,    // $10 in paise (or cents for USD)
      standard: 2000, // $20 in paise
      premium: 3000,  // $30 in paise
    };

    const amount = prices[plan];  // Get amount based on plan

    if (!amount) {
      return new Response(JSON.stringify({ error: "Invalid plan selected" }), { status: 400 });
    }

    // Create order in Razorpay
    const options = {
      amount: amount,  // Amount in paise
      currency: "USD", // Use "INR" for Indian Rupees
      receipt: `receipt_${plan}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Return order details as a JSON response
    return new Response(JSON.stringify({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    }), { status: 200 });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return new Response(JSON.stringify({ error: "Error creating Razorpay order" }), { status: 500 });
  }
}
