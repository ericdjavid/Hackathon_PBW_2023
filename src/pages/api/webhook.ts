// pages/api/webhook.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';

const stripe = new Stripe('sk_test_51MmyeOJe2DG0qGLhYk8LTmXQQDqgE9Bsdck7bFcedeg4WDIKUDc25sS6i4T1YE4KydXWvxWIPgqtvLjiANgMR8h500LoCwkG0u');

const endpointSecret = 'whsec_e0ff718cfaac6cbd5c298e2de16e620ee9a49a3c0362c07240a2b86b08f3541d';

export default async function webhook(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send('');
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
