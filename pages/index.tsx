import type {NextPage} from 'next'
import Head from 'next/head'
import React, {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import Logo from '/public/logo.png'
import Link from "next/link";
import Image from "next/image";
import {BaseStyles, Box, Button, ButtonGroup, PageLayout, Text, TextInput, ThemeProvider,} from '@primer/react'

const Home: NextPage = () => {
    const [mode, setMode] = useState<"auto" | "light" | "dark">("auto");
    const [advanced, setAdvanced] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState({
        color: false,
        labelColor: false,
        iconColor: false
    });
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

    const query = [
        {
            label: 'label',
            value: 'package',
            description: '[Text]',
        },
        {
            label: 'status',
            value: 'v1.2.3',
            description: '[Text]',
        },
        {
            label: 'color',
            value: 'teal',
            description: '[Color RGB] or [Color Name] (default: \'blue\')'
        },
        {
            label: 'icon',
            value: 'npm',
            description: '[Text] Use icon name in SimpleIcons.org'
        },
        {
            label: 'labelColor',
            value: '444',
            description: '[Color RGB] or [Color Name] (default: \'333333\')'
        },
        {
            label: 'iconColor',
            value: 'e4e4e4',
            description: '[Color RGB] or [Color Name] (default: \'959da5\')'
        }
    ]

    const defaultColors: string[] = [
        'red', 'orange', 'yellow', 'green', 'mint',
        'teal', 'cyan', 'blue', 'purple', 'pink',
        'gray', 'light', 'dark', 'black', 'white'
    ]

    useEffect(() => {
        const query = (badge.icon ? `&icon=${badge.icon}` : '')
            + (badge.label ? `&label=${badge.label}` : '')
            + (badge.status ? `&status=${badge.status}` : '')
            + (badge.color ? `&color=${badge.color}` : '')
            + (badge.labelColor ? `&labelColor=${badge.labelColor}` : '')
            + (badge.iconColor ? `&iconColor=${badge.iconColor}` : '')
        const result = "https://badge.ttsalpha.com/api?" + query.substring(1)
        setBadge({...badge, src: result, alt: badge.label || badge.status || badge.icon})
    }, [badge]);

    const setModeTheme = (e: any) => {
        setMode(e.currentTarget.value)
    }

    return (
        <ThemeProvider colorMode={mode} preventSSRMismatch>
            <BaseStyles>
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

                <PageLayout sx={{bg: "canvas.default"}} containerWidth="large">
                    <PageLayout.Header>
                        <Link href={'https://badge.ttsalpha.com'}><a>
                            <Text className={styles.title} as="h1">Badge Generator </Text>
                        </a></Link>
                        <Text as="p">Generate Markdown badges for GitHub README.</Text>

                        <ButtonGroup>
                            <Button size="small" onClick={setModeTheme} value="auto">Auto</Button>
                            <Button size="small" onClick={setModeTheme} value="light">Light</Button>
                            <Button size="small" onClick={setModeTheme} value="dark">Dark</Button>
                        </ButtonGroup>
                    </PageLayout.Header>

                    <PageLayout.Content>
                        <Text as="h2">Example</Text>
                        {exampleList.map((e) => (
                            /* eslint-disable @next/next/no-img-element */
                            <img key={e} className={styles.example} alt="" src={e}/>
                        ))}

                        <Text as="h2">Generator</Text>
                        <TextInput aria-label="label" name="label" placeholder="label"
                                   className={styles.input}
                                   onChange={e => setBadge({...badge, label: e.target.value})}/>
                        <TextInput aria-label="status" name="status" placeholder="status"
                                   className={styles.input}
                                   onChange={e => setBadge({...badge, status: e.target.value})}/>

                        <Box className={styles.inputSuggestion}
                             onBlur={() => setTimeout(
                                 () => setSuggestions({...suggestions, color: false}), 100
                             )}>
                            <Box className={styles.suggestion} display={suggestions.color ? "initial" : "none"}>
                                {defaultColors.map((value: string) => (
                                    <Box key={"color" + value} className={styles.option}
                                         onClick={() => setBadge({...badge, color: value})}>
                                        {value}
                                    </Box>
                                ))}
                            </Box>
                            <TextInput aria-label="color" name="color" placeholder="color"
                                       className={styles.input}
                                       value={badge.color}
                                       onSelect={() => setSuggestions({...suggestions, color: true})}
                                       onChange={e => setBadge({...badge, color: e.target.value})}/>
                        </Box>

                        <TextInput aria-label="icon" name="icon" placeholder="icon"
                                   className={styles.input}
                                   onChange={e => setBadge({...badge, icon: e.target.value})}/>
                        <br/>
                        <Button className={styles.advanced}
                                sx={{display: "inline-block"}}
                                onClick={() => setAdvanced(!advanced)}>
                            Advanced
                        </Button>
                        <Box style={{display: advanced ? 'initial' : 'none'}}>
                            <Box className={styles.inputSuggestion}
                                 onBlur={() => setTimeout(
                                     () => setSuggestions({...suggestions, labelColor: false}), 100
                                 )}>
                                <Box className={styles.suggestion}
                                     display={suggestions.labelColor ? "initial" : "none"}>
                                    {defaultColors.map((value: string) => (
                                        <Box key={"labelColor" + value} className={styles.option}
                                             onClick={() => setBadge({...badge, labelColor: value})}>
                                            {value}
                                        </Box>
                                    ))}
                                </Box>
                                <TextInput aria-label="labelColor" name="labelColor" placeholder="labelColor"
                                           className={styles.input}
                                           value={badge.labelColor}
                                           onSelect={() => setSuggestions({...suggestions, labelColor: true})}
                                           onChange={e => setBadge({...badge, labelColor: e.target.value})}/>
                            </Box>

                            <Box className={styles.inputSuggestion}
                                 onBlur={() => setTimeout(
                                     () => setSuggestions({...suggestions, iconColor: false}), 100
                                 )}>
                                <Box className={styles.suggestion} display={suggestions.iconColor ? "initial" : "none"}>
                                    {defaultColors.map((value: string) => (
                                        <Box key={"iconColor" + value} className={styles.option}
                                             onClick={() => setBadge({...badge, iconColor: value})}>
                                            {value}
                                        </Box>
                                    ))}
                                </Box>
                                <TextInput aria-label="iconColor" name="iconColor" placeholder="iconColor"
                                           className={styles.input}
                                           value={badge.iconColor}
                                           onSelect={() => setSuggestions({...suggestions, iconColor: true})}
                                           onChange={e => setBadge({...badge, iconColor: e.target.value})}/>
                            </Box>
                        </Box>
                        <Box className={styles.result}>
                            <Text>New badge:&nbsp;</Text>
                            <img src={badge.src} alt={badge.alt}/>
                        </Box>
                        <Box className={styles.result}>
                            <Text>Markdown:&nbsp;</Text>
                            <TextInput aria-label="markdown" name="markdown" width={300}
                                       value={`[![${badge.alt}](${badge.src})](https://example.com)`}/>
                            <Button onClick={() => navigator.clipboard
                                .writeText(`[![${badge.alt}](${badge.src})](https://example.com)`)
                                .then(null)}>
                                Copy
                            </Button>
                        </Box>

                        <Text as="h2">Query</Text>
                        {query.map((item, index) => (
                            <div key={index} className={styles.query}>
                                <div className={styles.queryHeader}>
                                    <Text className={styles.queryLabel}>{item.label}:&nbsp;</Text>
                                    <Text className={styles.queryValue}>&apos;{item.value}&apos;</Text>
                                </div>
                                <Text className={styles.queryDescription}>{item.description}</Text>
                            </div>
                        ))}
                        <Text as="h2">Author</Text>
                        <Text as="p">Author: Son Tran</Text>
                        <Text as="p">Info:&nbsp;
                            <Link href={'https://ttsalpha.com'}><a>Personal Blog</a></Link>
                            &nbsp;|&nbsp;
                            <Link href={'https://github.com/ttsalpha'}><a>Github</a></Link>
                            &nbsp;|&nbsp;
                            <Link href={'mailto:ttsalpha@icloud.com'}><a>Email</a></Link>
                        </Text>
                        <Text as="p">Repo:&nbsp;
                            <Link href={'https://github.com/ttsalpha/badge-generator'}>
                                <a>@ttsalpha/badge-generator</a>
                            </Link>
                        </Text>
                        <Text as="h2">License</Text>
                        <Text as="p">GNU General Public License © {new Date().getFullYear()}, Son Tran</Text>
                    </PageLayout.Content>
                    <PageLayout.Pane width="small" hidden={{narrow: true}}>
                        <Image src={Logo} alt="Logo"/>
                    </PageLayout.Pane>
                </PageLayout>
            </BaseStyles>
        </ThemeProvider>
    )
}

export default Home
