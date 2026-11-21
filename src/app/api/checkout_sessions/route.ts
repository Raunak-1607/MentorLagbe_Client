import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from "@/lib/stripe"
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
  const headersList = await headers()
  const userSession = await auth.api.getSession({ headers: headersList });

  // If user is already on Pro plan, prevent duplicate payment
  if (userSession?.user?.plan === "pro") {
    return NextResponse.json(
      { message: "You are already on the Pro plan." },
      { status: 400 }
    );
  }

  // Determine whether this checkout is for Student Pro ($10) or Tutor Pro ($15)
  let planType = "tutor";
  try {
    const formData = await request.formData();
    const formPlan = formData.get("plan");
    if (formPlan) {
      planType = String(formPlan);
    } else if (userSession?.user?.role === "student") {
      planType = "student";
    }
  } catch {
    if (userSession?.user?.role === "student") {
      planType = "student";
    }
  }

  const isStudent = planType === "student";

  // Price IDs:
  // Student Pro ($10): price_1UeHo2AO2ygmHzOPNlJOXRtF
  // Tutor Pro ($15):   price_1UdtCYAO2ygmHzOPtzH8MMnQ
  const priceId = isStudent
    ? "price_1UeHo2AO2ygmHzOPNlJOXRtF"
    : "price_1UdtCYAO2ygmHzOPtzH8MMnQ";

  const successPath = isStudent
    ? "/dashboard/student/success"
    : "/dashboard/Tutor/success";

  const cancelPath = isStudent
    ? "/dashboard/student/pricing"
    : "/dashboard/Tutor/pricing";

  try {
    const origin = headersList.get('origin')

    // Create Checkout Sessions with Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: userSession?.user?.email || undefined,
      metadata: {
        userId: userSession?.user?.id || "",
        role: isStudent ? "student" : "tutor",
      },
      success_url: `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${cancelPath}?canceled=true`,
      integration_identifier: isStudent ? 'Mentor_Lagbe_Student_001' : 'Mentor_Lagbe_Web_001',
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
