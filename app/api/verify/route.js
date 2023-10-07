export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle
        ? searchParams.get('title')?.slice(0, 100)
        : 'My default title';

    const verified = true;

    return NextResponse.json(
        { title, verified },
        {
            status: 200,
        },
    );
}