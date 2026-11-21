import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from "@/lib/stripe"
import { auth } from '@/lib/auth'

export async function POST() {
  const headersList = await headers()
  const userSession = await auth.api.getSession({ headers: headersList });

  // If user is already on Pro plan, prevent duplicate payment
  if (userSession?.user?.plan === "pro") {
    return NextResponse.json(
      { message: "You are already on the Pro plan." },
      { status: 400 }
    );
  }

  try {
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID of the product you want to sell
          price: 'price_1UdtCYAO2ygmHzOPtzH8MMnQ',
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: userSession?.user?.email || undefined,
      metadata: {
        userId: userSession?.user?.id || "",
      },
      success_url: `${origin}/dashboard/Tutor/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/Tutor/pricing?canceled=true`,
      integration_identifier: 'Mentor_Lagbe_Web_001',
    });
    return NextResponse.redirect(session.url as string, 303)
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
