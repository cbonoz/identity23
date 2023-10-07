import { NextResponse } from "next/server";

export async function POST(request) {
    // Get handle from request body
    const { handle } = await request.json();
    const title = 'My default title';
    const provisioned = true;

    return NextResponse.json(
        { title, provisioned, handle },
        {
            status: 200,
        },
    );
}