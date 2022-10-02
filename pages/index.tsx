import type {NextPage} from 'next'
import Head from 'next/head'
import {useState} from 'react'
import styles from '../styles/Home.module.css'
import logo from '/public/logo.png'

const Home: NextPage = () => {
    const [display, setDisplay] = useState({
        result: false,
        advanced: false
    })

    const [badge, setBadge] = useState({
        src: '',
        alt: '',
        label: '',
        status: '',
        color: '',
        icon: '',
        labelColor: '',
        iconColor: ''
    })

    const exampleList = [
        'https://badge.ttsalpha.com/api?icon=github&label=test&status=passing&color=green',
        'https://badge.ttsalpha.com/api?icon=npm&label=package&status=v1.2.3&color=teal',
        'https://badge.ttsalpha.com/api?label=license&status=GPL-3.0&color=pink',
        'https://badge.ttsalpha.com/api?icon=twitter&label=account&status=ttsalpha&color=1DA1F2&iconColor=1DA1F2',
        'https://badge.ttsalpha.com/api?icon=typescript&iconColor=white&label=TypeScript&labelColor=blue'
    ]

    const getExample = () => {
        return exampleList.map((e) => (
            <img key={e} className={styles.example} alt="" src={e}/>
        ))
    }

    const displayResult = () => {
        const query = (badge.icon ? `&icon=${badge.icon}` : '')
            + (badge.label ? `&label=${badge.label}` : '')
            + (badge.status ? `&status=${badge.status}` : '')
            + (badge.color ? `&color=${badge.color}` : '')
            + (badge.labelColor ? `&labelColor=${badge.labelColor}` : '')
            + (badge.iconColor ? `&iconColor=${badge.iconColor}` : '')
        const result = "https://badge.ttsalpha.com/api?" + query.substring(1)
        setBadge({...badge, src: result, alt: badge.label || badge.status || badge.icon})
        setDisplay({...display, result: true})
    }

    const handleEnter = (event: any) => {
        if (event.key === 'Enter')
            displayResult()
    }

    const defaultColors: string[] = [
        'red', 'orange', 'yellow', 'green', 'mint',
        'teal', 'cyan', 'blue', 'purple', 'pink',
        'gray', 'light', 'dark', 'black', 'white'
    ]

    const displayDefaultColors = (item: string) => {
        return defaultColors.map((e) => (
            <li key={item + e} className={styles.option}
                onClick={() => setBadge({...badge, [item]: e})}>
                {e}
            </li>
        ))
    }

    return (
        <div className={styles.container}>
            <Head>
                <title> Badge Generator </title>
                <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png"/>
                <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/bookmark.png"/>

                <meta name="short_name" content="ttsalpha"/>
                <meta name="author" content="Son Tran @ttsalpha"/>
                <meta name="description" content="Generate Markdown badges for Github README."/>
                <meta name="keywords" content="badge, generator, svg, badge generator,markdown, ttsalpha"/>

                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="start_url" content="."/>
                <meta name="theme-color" content="#ffffff"/>
                <meta name="display" content="standalone"/>
                <meta name="robots" content="index,follow"/>
                <meta name="google" content="notranslate"/>
                <meta name="googlebot" content="index,follow"/>
                <meta name="revisit-after" content="1 days"/>

                <meta property="og:title" itemProp="headline" content="Badge Generator | Son Tran @ttsalpha"/>
                <meta property="og:site_name" content="Badge Generator"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" itemProp="url" content="https://badge.ttsalpha.com"/>
                <meta property="og:image" itemProp="thumbnailUrl"
                      content="https://badge.ttsalpha.com/image_src.jpg"/>
                <meta property="og:image:height" content="900"/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:description" itemProp="description"
                      content="Generate Markdown badges for Github README."/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:creator" content="@ttsalpha"/>
                <meta name="twitter:url" content="https://badge.ttsalpha.com"/>
                <meta name="twitter:title" content="Badge Generator | Son Tran @ttsalpha"/>
                <meta name="twitter:description"
                      content="Generate Markdown badges for Github README."/>
                <meta name="twitter:image" content="https://badge.ttsalpha.com/image_src.jpg"/>
            </Head>

            <main className={styles.main} onKeyPress={handleEnter}>
                <div>
                    <a href={'https://badge.ttsalpha.com'}>
                        <h1 className={styles.title}>Badge Generator</h1>
                    </a>
                    <h3>by Son Tran @ttsalpha</h3>
                </div>
                <img src={logo.src} alt='Logo' className={styles.logo}/>
                <div className={styles.guide}>
                    <h3>Example</h3>
                    {getExample()}
                    <p>Generate Markdown badges for Github README.</p>
                    <h3>Generator</h3>
                    <div className={styles.field}>
                        <div>
                            <input className={styles.input} placeholder={'label'}
                                   onChange={e => setBadge({...badge, label: e.target.value})}/>
                            <input className={styles.input} placeholder={'status'}
                                   onChange={e => setBadge({...badge, status: e.target.value})}/>
                            <div className={styles.colorStatus}>
                                <ul className={`${styles.datalist} ${styles.suggestColorStatus}`}>
                                    {displayDefaultColors('color')}</ul>
                                <input className={styles.input} placeholder={'color'}
                                       value={badge.color}
                                       onChange={e => setBadge({...badge, color: e.target.value})}/>
                            </div>
                            <input className={styles.input} placeholder={'icon'}
                                   onChange={e => setBadge({...badge, icon: e.target.value})}/>
                            <div>
                                <p className={styles.advanced} onClick={() =>
                                    setDisplay({...display, advanced: !display.advanced})}>
                                    Advanced Query</p>
                                <div style={{display: display.advanced ? 'initial' : 'none'}}>
                                    <div className={styles.colorLabel}>
                                        <ul className={`${styles.datalist} ${styles.suggestColorLabel}`}>
                                            {displayDefaultColors('labelColor')}</ul>
                                        <input className={styles.input} placeholder={'labelColor'}
                                               value={badge.labelColor}
                                               onChange={e => setBadge({...badge, labelColor: e.target.value})}/>
                                    </div>
                                    <div className={styles.colorIcon}>
                                        <ul className={`${styles.datalist} ${styles.suggestColorIcon}`}>
                                            {displayDefaultColors('iconColor')}</ul>
                                        <input className={styles.input} placeholder={'iconColor'}
                                               value={badge.iconColor}
                                               onChange={e => setBadge({...badge, iconColor: e.target.value})}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className={styles.generator} onClick={displayResult}>Generator</button>
                    </div>
                    <div style={{display: display.result ? 'initial' : 'none'}}>
                        <div className={styles.result}>New badge:&nbsp;
                            <img src={badge.src} alt={badge.alt}/>
                        </div>
                        <div className={styles.result}>Markdown:&nbsp;
                            <div className={styles.preview}>[![{badge.alt}]({badge.src})](https://example.com)</div>
                            <button className={styles.copy} onClick={() =>
                                navigator.clipboard.writeText(
                                    `[![${badge.alt}](${badge.src})](https://example.com)`
                                ).then(null)
                            }>Copy
                            </button>
                        </div>
                    </div>
                    <h3>Query</h3>
                    <div className={styles.variables}>
                        <div>
                            <div className={styles.key}>label: &apos;npm&apos;</div>
                            [Text]
                        </div>
                        <div>
                            <div className={styles.key}>status: &apos;v1.2.3&apos;</div>
                            [Text]
                        </div>
                        <div>
                            <div className={styles.key}>color: &apos;teal&apos;</div>
                            [Color RGB] or [Color Name] (default: &apos;blue&apos;)
                        </div>
                        <div>
                            <div className={styles.key}>icon: &apos;npm&apos;</div>
                            [Text] Use icon name in SimpleIcons.org
                        </div>
                        <div>
                            <div className={styles.key}>labelColor: &apos;444&apos;</div>
                            [Color RGB] or [Color Name] (default: &apos;333333&apos;)
                        </div>
                        <div>
                            <div className={styles.key}>iconColor: &apos;e4e4e4&apos;</div>
                            [Color RGB] or [Color Name] (default: &apos;959da5&apos;)
                        </div>
                    </div>
                    <h3>Meta</h3>
                    <p>Author: Son Tran</p>
                    <p>Info:
                        <a href={'https://ttsalpha.com'}> Personal Blog </a>
                        |
                        <a href={'https://github.com/ttsalpha'}> Github </a>
                        |
                        <a href={'mailto:ttsalpha@icloud.com'}> Email </a>
                    </p>
                    <p>Repo:&nbsp;
                        <a href={'https://github.com/ttsalpha/badge-generator'}>
                            @ttsalpha/badge-generator</a></p>
                    <h3>License</h3>
                    <p>GNU General Public License © {new Date().getFullYear()}, Son Tran</p>
                </div>
            </main>
        </div>
    )
}

export default Home
