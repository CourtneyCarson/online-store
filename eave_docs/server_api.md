## Checkout Session Creation

```
POST /checkout
```

This API endpoint is used to create a new checkout session with Stripe. It accepts a list of items in the request body, creates a checkout session with shipping options and returns the session details.

### Path Parameters

None

### Example Request

```javascript
fetch('http://localhost:4242/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    items: [
      {
        name: 'Product 1',
        product: 'https://example.com/product1.jpg',
        price: 10,
        quantity: 2,
      },
    ],
  }),
});
```

### Example Response

```json
{
  "id": "cs_test_a1B2c3D4e5F6g7H8i9J0K1L2",
  "object": "checkout.session",
  "payment_method_types": ["card"],
  "shipping_address_collection": {
    "allowed_countries": ["US", "CA"]
  },
  "shipping_options": [
    {
      "shipping_rate_data": {
        "type": "fixed_amount",
        "fixed_amount": {
          "amount": 0,
          "currency": "usd"
        },
        "display_name": "Free shipping",
        "delivery_estimate": {
          "minimum": {
            "unit": "business_day",
            "value": 5
          },
          "maximum": {
            "unit": "business_day",
            "value": 7
          }
        }
      }
    },
    {
      "shipping_rate_data": {
        "type": "fixed_amount",
        "fixed_amount": {
          "amount": 1500,
          "currency": "usd"
        },
        "display_name": "Next day air",
        "delivery_estimate": {
          "minimum": {
            "unit": "business_day",
            "value": 1
          },
          "maximum": {
            "unit": "business_day",
            "value": 1
          }
        }
      }
    }
  ],
  "line_items": [
    {
      "price_data": {
        "currency": "usd",
        "product_data": {
          "name": "Product 1",
          "images": ["https://example.com/product1.jpg"]
        },
        "unit_amount": 1000
      },
      "quantity": 2
    }
  ],
  "mode": "payment",
  "success_url": "http://localhost:4242/success.html",
  "cancel_url": "http://localhost:4242/cancel.html"
}
```

### Response Codes

**200**: The checkout session was successfully created.

**400**: Bad Request. The request was unacceptable, often due to missing a required parameter.

**500**: Server errors. Something went wrong on the server.

<br />

