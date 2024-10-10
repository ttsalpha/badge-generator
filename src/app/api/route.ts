import { NextRequest } from 'next/server';
import Generator from "@/lib/index";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams);

    try {
        const badge = Generator(params);
        if (!badge) {
            throw new Error('Badge generation failed');
        }

        return new Response(badge, {
            status: 200,
            headers: {
                'Content-Type': 'image/svg+xml; charset=utf-8',
            },
        });
    } catch (e) {
        const errorBadge = Generator({ label: 'error', status: '404s', color: 'red' });
        return new Response(errorBadge || 'Error generating badge', {
            status: 200,
            headers: {
                'Content-Type': 'image/svg+xml; charset=utf-8',
            },
        });
    }
}
