const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
        const r = parseInt(result[1], 16)
        const g = parseInt(result[2], 16)
        const b = parseInt(result[3], 16)
        return {r, g, b}
    }
    return
}

export const calcTextColors = (color: string) => {
    if (color.length === 3) {
        color = color.split('').map((hex) => {
            return hex + hex
        }).join('')
    }

    const rgb = hexToRgb(color)
    const white = ['ffffff', '010101']
    const black = ['333333', 'cccccc']
    if (rgb) {
        const brightness = +((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 255000).toFixed(2)
        const brightnessThreshold = 0.69
        return brightness <= brightnessThreshold ? white : black
    }
    return white
}
