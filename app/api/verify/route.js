import { NextResponse } from "next/server";

export async function POST(request) {
    const title = 'My default title';
    const provisioned = true;

    return NextResponse.json(
        { title, provisioned },
        {
            status: 200,
        },
    );
}