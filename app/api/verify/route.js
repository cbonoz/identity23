import { NextResponse } from "next/server";

export async function GET(request) {
    const title = 'My default title';
    const provisioned = true;

    return NextResponse.json(
        { title, provisioned },
        {
            status: 200,
        },
    );
}