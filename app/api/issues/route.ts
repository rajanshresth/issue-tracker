import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../validationSchema";

export async function POST(request:NextRequest){
    const res = await fetch(new URL('/api/auth/session', request.nextUrl.origin), {
        headers: { cookie: request.headers.get('cookie') || '' }
    });
    const authData = await res.json().catch(() => null);
    if(!authData?.session)
        return NextResponse.json({},{status:401});
    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    if(!validation.success) {
        return NextResponse.json(validation.error.format(),{status:400})
    }

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description:body.description}
    })

    return NextResponse.json(newIssue,{status:201})
}

export async function GET(request:NextRequest) {
    const issue=await prisma.issue.findMany();
    return NextResponse.json(issue);
}
