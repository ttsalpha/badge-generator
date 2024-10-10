// =================== Libraries =================== //
import React from "react";
import type { Metadata } from "next";
import { ConfigProvider } from "antd"
import { AntdRegistry } from "@ant-design/nextjs-registry"

// =================== Styles =================== //
import "./globals.css";

// =================== Font =================== //
import { Nunito } from "next/font/google"

const font = Nunito({
    subsets: ["latin", "latin-ext", "vietnamese"],
    weight: ["200", "300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
    title: "Badge Generator",
    description: "Generate Markdown badges for GitHub README",
};


function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en">
            <body className={font.className}>
                <AntdRegistry>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#55BEF0",
                                fontFamily: font.style.fontFamily,
                            },
                        }}
                    >
                        {children}
                    </ConfigProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}

export default RootLayout;
