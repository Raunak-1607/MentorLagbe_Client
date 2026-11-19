import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth, db } from "@/lib/auth";
import type { CreateTuition, Tuition } from "@/types/tuition";

async function getTutorSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return null;
  if (session.user.role !== "tutor") return null;

  return session;
}

export async function POST(request: Request) {
  const session = await getTutorSession();
  if (!session) return NextResponse.json({ message: "Only signed-in tutors can post tuitions." }, { status: 401 });

  const body = (await request.json()) as CreateTuition;

  if (!body.title || !body.subject || !body.classLevel || !body.location || !body.description) {
    return NextResponse.json({ message: "Please fill in all required fields." }, { status: 400 });
  }

  if (body.mode !== "Online" && body.mode !== "Offline") {
    return NextResponse.json({ message: "Mode must be Online or Offline." }, { status: 400 });
  }

  const tuition: Tuition = {
    ...body,
   
    tutorId: session.user.id,
    tutorName: session.user.name,
    tutorEmail: session.user.email,
    approvalStatus: "pending",
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  await db.collection<Tuition>("tuition").insertOne(tuition);
  return NextResponse.json(tuition, { status: 201 });
}

export async function GET() {
  const session = await getTutorSession();
  if (!session) return NextResponse.json({ message: "Only signed-in tutors can view tuitions." }, { status: 401 });

  const tuitions = await db
    .collection<Tuition>("tuition")
    .find({ tutorId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(tuitions);
}
