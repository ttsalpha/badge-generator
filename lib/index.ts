import simpleIcons from 'simple-icons'
import {variables} from './variables'
import {checkColors, colorAlias} from './color'

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
        label,
        labelColor,
        status,
        color,
        icon,
        iconColor
    }: Option) {

    if (label === undefined && status === undefined && icon === undefined)
        return false

    label == undefined ? label = '' : null
    status == undefined ? status = '' : null
    color = color == undefined ? '007ec6' : colorAlias(color)
    labelColor = labelColor == undefined ? '333333' : colorAlias(labelColor)
    iconColor = iconColor == undefined ? '959da5' : colorAlias(iconColor)

    let [_widthLabel, _widthStatus, _paddingLabel, _paddingStatus, _widthLabelBG, _widthStatusBG, _widthBadge]
        = [0, 0, 0, 0, 0, 0, 0]
    let [_textLabel, _shadowLabel, _textStatus, _shadowStatus]
        = ['ffffff', '010101', 'ffffff', '010101']

    if (label) {
        _widthLabel += Math.round(pixelWidth(label, {font: 'Verdana', size: 11}))
        _widthLabelBG += _widthLabel + 10
        _paddingLabel += _widthLabel * 5 + 50
        _paddingStatus += _widthLabelBG * 10
        _widthBadge += _widthLabel + 10

        if (labelColor)
            [_textLabel, _shadowLabel] = checkColors(labelColor)
    }

    if (status) {
        _widthStatus += Math.round(pixelWidth(status, {font: 'Verdana', size: 11}))
        _widthStatusBG += _widthStatus + 10
        _paddingStatus += _widthStatus * 5 + 50
        _widthBadge += _widthStatus + 10

        if (color)
            [_textStatus, _shadowStatus] = checkColors(color)
    }

    if (icon) {
        _paddingLabel += 180
        _widthLabelBG += label ? 18 : 23
        _paddingStatus += label ? 180 : 230
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
        <title>${label || status}</title>
        <defs>
            <linearGradient id="s" x2="0" y2="100%">
                <stop offset="0" stop-color="#bbbbbb" stop-opacity=".1"/>
                <stop offset="1" stop-color="#${labelColor}" stop-opacity=".1"/>
            </linearGradient>
            <clipPath id="r">
                <rect width="${_widthBadge}" height="20" rx="3" fill="#fff"/>
            </clipPath>
        </defs>
        <g clip-path="url(#r)">
            <rect width="${_widthLabelBG}" height="20" fill="#${labelColor}"/>
            <rect width="${_widthStatusBG}" height="20" fill="#${color}" x="${_widthLabelBG}"/>
            <rect width="${_widthBadge}" height="20" fill="url(#s)"/>
        </g>
        <g fill="#ffffff" text-anchor="middle" font-family="Verdana,sans-serif" text-rendering="geometricPrecision" font-size="110">
            ${icon || ''}
            <text x="${_paddingLabel}" y="150" fill="#${_shadowLabel}" transform="scale(.1)" textLength="${_widthLabel * 10}" fill-opacity=".3" aria-hidden="true"> ${label} </text>
            <text x="${_paddingLabel}" y="140" fill="#${_textLabel}" transform="scale(.1)" textLength="${_widthLabel * 10}"> ${label} </text>
            <text x="${_paddingStatus}" y="150" fill="#${_shadowStatus}" transform="scale(.1)" textLength="${_widthStatus * 10}" fill-opacity=".3" aria-hidden="true"> ${status} </text>
            <text x="${_paddingStatus}" y="140" fill="#${_textStatus}" transform="scale(.1)" textLength="${_widthStatus * 10}"> ${status} </text>
        </g>
    </svg>`
}

module.exports = Generator
