// =================== Libraries =================== //
import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

// =================== Styles =================== //
import "./globals.css";

// =================== Font =================== //
import { Nunito } from "next/font/google"

const font = Nunito({
    subsets: ["latin", "latin-ext", "vietnamese"],
    weight: ["400", "700"],
})

const siteUrl = "https://badge.ttsalpha.com";

export const metadata: Metadata = {
    title: "Badge Generator",
    description: "Generate Markdown badges for GitHub README",
    openGraph: {
        title: "Badge Generator",
        description: "Generate Markdown badges for GitHub README",
        url: siteUrl,
        siteName: "Badge Generator",
        type: "website",
        images: [
            {
                url: `${siteUrl}/logo.png`,
                width: 512,
                height: 512,
                alt: "Badge Generator",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Badge Generator",
        description: "Generate Markdown badges for GitHub README",
    },
};


function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en">
            <body className={font.className}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}

export default RootLayout;
