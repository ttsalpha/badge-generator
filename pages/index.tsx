import type {NextPage} from 'next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import ReactGA from 'react-ga'
import Site from '../components/site'
import styles from '../styles/Home.module.css'
import logo from '/public/logo.png'

const Home: NextPage = () => {

    useEffect(() => {
        if (window.location.href.includes("https://badge-generator.vercel.app")) {
            ReactGA.initialize("UA-217421984-1")
            ReactGA.pageview('/')
        }
    })

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
        'https://badge-generator.vercel.app/api?icon=github&label=test&status=passing&color=green',
        'https://badge-generator.vercel.app/api?icon=npm&label=package&status=v1.2.3&color=teal',
        'https://badge-generator.vercel.app/api?label=license&status=GPL-3.0&color=pink',
        'https://badge-generator.vercel.app/api?icon=twitter&label=account&status=ttsalpha&color=1DA1F2&iconColor=1DA1F2',
        'https://badge-generator.vercel.app/api?icon=typescript&iconColor=white&label=TypeScript&labelColor=blue'
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
        const result = "https://badge-generator.vercel.app/api?" + query.substring(1)
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
                <Site/>
            </Head>

            <main className={styles.main} onKeyPress={handleEnter}>
                <div>
                    <a href={'https://badge-generator.vercel.app'}>
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
                        <a href={'https://ttsalpha.github.io'}> Personal Blog </a>
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
