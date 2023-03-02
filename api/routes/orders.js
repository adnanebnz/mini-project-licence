require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const router = require("express").Router();

router.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cart.map((item) => {
    return {
      price_data: {
        currency: "dzd",
        product_data: {
          name: item.title,
          description: item.desc,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.count,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: "http://localhost:3000/checkout/success",
    cancel_url: "http://localhost:3000/checkout/cancel",
  });

  res.send({ url: session.url });
});

module.exports = router;
