const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require('stripe')(
  'pk_test_51NgZ9ACmKyG5WxKZaty4gFzhexl5DiFJkuvj5lWSYo7xWBMvlCWYnuwa5p1lT5oj2JmgRrfPVFfCYUS66GvxQbDt00LrCAtpug'
);

app.post('/checkout', async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.product],
        },
        unit_amount: item.price * 100, // stiripe uses cents, we want dollars
      })),
      mode: 'payment',
      success_url: 'http://localhost:4242/success.html',
      cancel_url: 'http://localhost:4242/cancel.html',
    });
    res.status(200).json(session)
  } catch (error) {
    next(error);
  }
});

app.listen(4242, () => console.log('Running on port 4242'));

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// }
// );
