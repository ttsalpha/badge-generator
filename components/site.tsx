import {NextPage} from 'next'

const Site: NextPage = () => {
    return (
        <>
            <meta name="short_name" content="ttsalpha"/>
            <meta name="author" content="Son Tran @ttsalpha"/>
            <meta name="description"
                  content="Create a badge can be included in GitHub README or any other web page."/>
            <meta name="keywords" content="badge, generator, svg, badge generator, ttsalpha, sontran"/>

            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="start_url" content="."/>
            <meta name="theme-color" content="#222222"/>
            <meta name="display" content="standalone"/>
            <meta name="robots" content="index,follow"/>
            <meta name="google" content="notranslate"/>
            <meta name="googlebot" content="index,follow"/>
            <meta name="revisit-after" content="1 days"/>

            <meta property="og:title" itemProp="headline" content="Badge Generator | Son Tran @ttsalpha"/>
            <meta property="og:site_name" content="Badge Generator"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" itemProp="url" content="https://badge-generator.vercel.app"/>
            <meta property="og:image" itemProp="thumbnailUrl"
                  content="https://badge-generator.vercel.app/image_src.jpg"/>
            <meta property="og:image:height" content="900"/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:description" itemProp="description"
                  content="Create a badge can be included in GitHub README or any other web page."/>

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:creator" content="@ttsalpha"/>
            <meta name="twitter:url" content="https://badge-generator.vercel.app"/>
            <meta name="twitter:title" content="Badge Generator | Son Tran @ttsalpha"/>
            <meta name="twitter:description"
                  content="Create a badge can be included in GitHub README or any other web page."/>
            <meta name="twitter:image" content="https://badge-generator.vercel.app/image_src.jpg"/>
        </>
    )
}

export default Site
