import { NextResponse } from "next/server";
import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";

export async function PATCH(request: Request) {
  const origin = new URL(request.url).origin;
  const res = await fetch(new URL("/api/auth/session", origin), {
    headers: { cookie: request.headers.get("cookie") || "" },
  });
  const authData = await res.json().catch(() => null);
  if (!authData?.session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const id = parseInt(new URL(request.url).pathname.split("/").pop() || "");
  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: Request) {
  const origin = new URL(request.url).origin;
  const res = await fetch(new URL("/api/auth/session", origin), {
    headers: { cookie: request.headers.get("cookie") || "" },
  });
  const authData = await res.json().catch(() => null);
  if (!authData?.session) return NextResponse.json({}, { status: 401 });

  const id = parseInt(new URL(request.url).pathname.split("/").pop() || "");
  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
