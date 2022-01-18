import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import ReactGA from 'react-ga'
import Site from './site'
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
        result: 'none',
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
        'https://badge-generator.vercel.app/api?icon=npm&label=package&status=v1.3.2&color=teal',
        'https://badge-generator.vercel.app/api?label=license&status=GPL-3.0&color=pink',
        'https://badge-generator.vercel.app/api?icon=twitter&label=account&status=ttsalpha&color=1DA1F2&iconColor=1DA1F2',
        'https://badge-generator.vercel.app/api?icon=typescript&iconColor=white&label=TypeScript&labelColor=blue'
    ]

    const getExample = () => {
        return exampleList.map((e) => (
            /* eslint-disable */
            <img key={e.toString()} style={{margin: 2}} alt="" src={e}/>
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
        setBadge({...badge, src: result, alt: badge.label})
        setDisplay({...display, result: 'block'})
    }

    const displayAdvanced = () => {
        setDisplay({...display, advanced: !display.advanced})
    }

    function handleEnter(event: any) {
        if (event.key === 'Enter')
            displayResult()
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
                <div className={styles.logo}>
                    <Image
                        src={logo}
                        width={250} height={250}
                        alt="Logo"
                        layout="fixed"
                        objectFit="cover"
                        quality={100}/>
                </div>
                <div className={styles.guide}>
                    <h3>Example</h3>
                    {getExample()}
                    <p>Create a badge can be included in GitHub README or any other web page.</p>
                    <h3>Generator</h3>
                    <div>
                        <input className={styles.input} placeholder={'label'}
                               onChange={e => setBadge({...badge, label: e.target.value})}/>
                        <input className={styles.input} placeholder={'status'}
                               onChange={e => setBadge({...badge, status: e.target.value})}/>
                        <input className={styles.input} placeholder={'color'}
                               onChange={e => setBadge({...badge, color: e.target.value})}/>
                        <input className={styles.input} placeholder={'icon'}
                               onChange={e => setBadge({...badge, icon: e.target.value})}/>
                        <button className={styles.generator} onClick={displayResult}>Generator</button>
                    </div>
                    <div>
                        <p className={styles.advanced} onClick={displayAdvanced}>Advanced Query</p>
                        <div style={{display: display.advanced ? 'inline-block' : 'none'}}>
                            <input className={styles.input} placeholder={'labelColor'}
                                   onChange={e => setBadge({...badge, labelColor: e.target.value})}/>
                            <input className={styles.input} placeholder={'iconColor'}
                                   onChange={e => setBadge({...badge, iconColor: e.target.value})}/>
                        </div>
                    </div>
                    <div style={{display: display.result}}>
                        <div className={styles.result}>New badge:&nbsp;
                            {/* eslint-disable */}
                            <img src={badge.src} alt={badge.alt}/>
                        </div>
                        <div className={styles.result}>Markdown:&nbsp;
                            <div className={styles.preview}>![{badge.alt}]({badge.src})</div>
                            <button className={styles.copy} onClick={() => {
                                navigator.clipboard.writeText(`![${badge.alt}](${badge.src})`).then(null)
                            }}>Copy
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
                            <div className={styles.key}>iconColor: &apos;&apos;</div>
                            [Color RGB] or [Color Name] (default: &apos;959da5&apos;)
                        </div>
                        <div>
                            <div className={styles.key}>labelColor: &apos;444&apos;</div>
                            [Color RGB] or [Color Name] (default: &apos;333333&apos;)
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
