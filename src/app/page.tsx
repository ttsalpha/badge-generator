"use client";

// ================= Libraries ================= //
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ConfigProvider, Input, Button } from "antd";
import { CopyOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";

// ================= Styles ================= //
import "./index.css";

// ================= Components ================= //
const HomePage = () => {

    // ================= State ================= //
    const [advance, setAdvanced] = useState<boolean>(false);
    const [image, setImage] = useState<{
        src: string,
        alt: string
    }>({ src: '', alt: '' });
    const [badge, setBadge] = useState({
        label: '',
        labelColor: '',
        status: '',
        color: '',
        icon: '',
        iconColor: ''
    })
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    // ================= Effect ================= //
    useEffect(() => {
        const query = (badge.icon ? `&icon=${badge.icon}` : '')
            + (badge.label ? `&label=${badge.label}` : '')
            + (badge.status ? `&status=${badge.status}` : '')
            + (badge.color ? `&color=${badge.color}` : '')
            + (badge.labelColor ? `&labelColor=${badge.labelColor}` : '')
            + (badge.iconColor ? `&iconColor=${badge.iconColor}` : '')
        const result = "api?" + query.substring(1)
        setImage({ ...image, src: result, alt: badge.label || badge.status || badge.icon })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [badge]);

    // ================= Handlers ================= //
    const handleAdvanced = () => setAdvanced(!advance)

    const handleChange = (key: string, value: string) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            setBadge((prevBadge) => ({ ...prevBadge, [key]: value }));
        }, 500);
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    // ================= Examples ================= //
    const examples = [
        'api?icon=github&label=test&status=passing&color=green',
        'api?icon=npm&label=package&status=v1.2.3&color=teal',
        'api?label=license&status=GPL-3.0&color=pink',
        'api?icon=x&label=account&status=ttsalpha&color=1DA1F2',
        'api?icon=typescript&iconColor=white&label=TypeScript&labelColor=blue'
    ]

    return (
        <ConfigProvider>
            <div className="container">
                <Link href="/" className="header">
                    <div>
                        <h1 className="title">Badge Generator</h1>
                        <span className="description">Generate Markdown badges for GitHub README</span>
                    </div>
                    <div className="logo-image">
                        <img src="/favicon.png" alt="" />
                    </div>
                </Link>

                <div className="box example">
                    <h2 className="box-title">Example</h2>

                    <div className="example-content">
                        {examples.map((example, index) => <img key={index} src={example} alt="" />)}
                    </div>
                </div>

                <div className="box generator">
                    <div className="generator-header">

                        <h2 className="box-title">Generator</h2>
                        <Button icon={advance ? <UpOutlined /> : <DownOutlined />} onClick={handleAdvanced}>Advanced</Button>
                    </div>

                    <div className="generator-content">
                        <Input placeholder="Label" onChange={(e) => handleChange('label', e.target.value)} />
                        <Input placeholder="Status" onChange={(e) => handleChange('status', e.target.value)} />
                        <Input placeholder="Icon" onChange={(e) => handleChange('icon', e.target.value)} />
                    </div>

                    <div className="generator-content"
                        style={{ display: advance ? 'flex' : 'none' }}>
                        <Input placeholder="Label Color" onChange={(e) => handleChange('labelColor', e.target.value)} />
                        <Input placeholder="Color" onChange={(e) => handleChange('color', e.target.value)} />
                        <Input placeholder="Icon Color" onChange={(e) => handleChange('iconColor', e.target.value)} />
                    </div>

                    <div className="generator-result">
                        <div className="result-item">
                            <span>New badge</span>
                            <img src={image.src} alt={image.alt} />
                        </div>
                        <div className="result-item">
                            <span className="result-item-label">Markdown</span>
                            <div className="markdown-content">
                                {`![${image.alt}](https://badge.ttsalpha.com/${image.src})`}
                            </div>
                            <Button
                                icon={<CopyOutlined />}
                                onClick={() => handleCopy(`![${image.alt}](https://badge.ttsalpha.com/${image.src})`)}
                            >
                                Copy
                            </Button>
                        </div>
                        <div className="result-item">
                            <span className="result-item-label">HTML</span>
                            <div className="html-content">
                                {`<img src="https://badge.ttsalpha.com/${image.src}" alt="${image.alt}"/>`}
                            </div>
                            <Button
                                icon={<CopyOutlined />}
                                onClick={() => handleCopy(`<img src="https://badge.ttsalpha.com/${image.src}" alt="${image.alt}"/>`)}
                            >
                                Copy
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="box type">
                    <h2 className="box-title">Type</h2>

                    <p className="type-item">
                        <span>Label</span>
                        <span>Text</span>
                    </p>
                    <p className="type-item">
                        <span>Status</span>
                        <span>Text</span>
                    </p>
                    <p className="type-item">
                        <span>Color</span>
                        <span>Color HEX or color name</span>
                    </p>
                    <p className="type-item">
                        <span>Icon</span>
                        <span>Use icon name in SimpleIcons.org</span>
                    </p>
                    <p className="type-item">
                        <span>Label Color</span>
                        <span>Color HEX or color name</span>
                    </p>
                    <p className="type-item">
                        <span>Icon Color</span>
                        <span>Color HEX or color name</span>
                    </p>
                </div>

                <div className="box author">
                    <h2 className="box-title">Author</h2>

                    <p>Son Tran</p>
                    <p className="links">
                        <span>Info:</span>
                        <Link href="https://ttsalpha.com">Personal Blog</Link> |
                        <Link href="https://github.com/ttsalpha">GitHub</Link> |
                        <Link href="mailto:ttsalpha@icloud.com">Email</Link>
                    </p>
                    <p className="links">
                        <span>Repo:</span>
                        <Link href="https://github.com/ttsalpha/badge-generator">
                            @ttsalpha/badge-generator
                        </Link>
                    </p>
                </div>

                <div className="licence">
                    <p>GNU General Public License v3.0</p>
                    <p>© 2022, Son Tran</p>
                </div>
            </div>
        </ConfigProvider>
    )
};

export default HomePage;
