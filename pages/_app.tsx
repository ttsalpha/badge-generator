import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {BaseStyles, SSRProvider, ThemeProvider} from "@primer/react";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <SSRProvider>
            <ThemeProvider preventSSRMismatch>
                <BaseStyles>
                    <Component {...pageProps} />
                </BaseStyles>
            </ThemeProvider>
        </SSRProvider>
    )
}

export default MyApp
