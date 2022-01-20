import simpleIcons from 'simple-icons'
import {variables} from './variables'
import {calcTextColors} from './color'

const pixelWidth = require('string-pixel-width')

export interface Option {
    label?: string;
    labelColor?: string;
    status?: string;
    color?: string;
    icon?: string;
    iconColor?: string;
}

export default function Generator(
    {
        label = '',
        labelColor = 'dark',
        status = '',
        color = 'blue',
        icon = '',
        iconColor = 'light'
    }: Option) {

    if (!label && !status && !icon)
        return false

    color = variables.colorAlias[color] || color
    labelColor = variables.colorAlias[labelColor] || labelColor
    iconColor = variables.colorAlias[iconColor] || iconColor

    let [_widthLabel, _widthStatus, _paddingLabel, _paddingStatus, _widthLabelBG, _widthStatusBG, _widthBadge]
        = [0, 0, 0, 0, 0, 0, 0]
    let [_textLabel, _shadowLabel, _textStatus, _shadowStatus]
        = ['ffffff', '010101', 'ffffff', '010101']

    if (label) {
        _widthLabel += Math.round(pixelWidth(label, {font: 'Verdana', size: 11}))
        _widthLabelBG += _widthLabel + 10
        _paddingLabel += _widthLabel / 2 + 5
        _paddingStatus += _widthLabelBG
        _widthBadge += _widthLabel + 10

        if (labelColor)
            [_textLabel, _shadowLabel] = calcTextColors(labelColor)
    }

    if (status) {
        _widthStatus += Math.round(pixelWidth(status, {font: 'Verdana', size: 11}))
        _widthStatusBG += _widthStatus + 10
        _paddingStatus += _widthStatus / 2 + 5
        _widthBadge += _widthStatus + 10

        if (color)
            [_textStatus, _shadowStatus] = calcTextColors(color)
    }

    if (icon) {
        _paddingLabel += 18
        _widthLabelBG += label ? 18 : 23
        _paddingStatus += label ? 18 : 23
        _widthBadge += label ? 18 : 23

        // create svg base64 encode
        try {
            const path = icon === 'ttsalpha'
                ? variables.path : simpleIcons.Get(String(icon)).path

            const svgEmbed = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#${iconColor}" d="${path}"/>
            </svg>`
            const svgEncode = Buffer.from(svgEmbed, 'binary').toString('base64')
            icon = `<image x="4" y="3" height="14" width="14" xlink:href="data:image/svg+xml;base64,${svgEncode}"></image>`
        } catch (e) {
            return false
        }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${_widthBadge}" height="20">
        <title>${label + ' ' + status}</title>
        <defs>
            <linearGradient id="s" x2="0" y2="100%">
                <stop offset="0" stop-color="#bbbbbb" stop-opacity=".1"/>
                <stop offset="1" stop-opacity=".1"/>
            </linearGradient>
            <clipPath id="r">
                <rect width="${_widthBadge}" height="20" rx="3" fill="#ffffff"/>
            </clipPath>
        </defs>
        <g clip-path="url(#r)">
            <rect width="${_widthLabelBG}" height="20" fill="#${labelColor}"/>
            <rect width="${_widthStatusBG}" height="20" fill="#${color}" x="${_widthLabelBG}"/>
            <rect width="${_widthBadge}" height="20" fill="url(#s)"/>
        </g>
        ${icon || ''}
        <g fill="#ffffff" text-anchor="middle" font-family="Verdana,sans-serif" font-size="11">
            <text x="${_paddingLabel}" y="15" fill="#${_shadowLabel}" textLength="${_widthLabel}" fill-opacity=".3">${label}</text>
            <text x="${_paddingLabel}" y="14" fill="#${_textLabel}" textLength="${_widthLabel}">${label}</text>
            <text x="${_paddingStatus}" y="15" fill="#${_shadowStatus}" textLength="${_widthStatus}" fill-opacity=".3">${status}</text>
            <text x="${_paddingStatus}" y="14" fill="#${_textStatus}" textLength="${_widthStatus}">${status}</text>
        </g>
    </svg>`
}

module.exports = Generator
