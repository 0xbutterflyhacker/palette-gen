/**
 * class encompassing the color object and most methods needed
 */
export class color {
    red: number
    green: number
    blue: number
    hex: string

    constructor(r: number, g: number, b: number) {
        this.red = Math.abs(r) % 256
        this.green = Math.abs(g) % 256
        this.blue = Math.abs(b) % 256
        this.hex = `#${(r > 15) ? r.toString(16) : '0'+r.toString(16)}${(g > 15) ? g.toString(16) : '0'+g.toString(16)}${(b > 15) ? b.toString(16) : '0'+b.toString(16)}`
    }
    /**
     * converts a color object from rgb notation to hsl notation.
     * @returns an array of numbers; element 0 is the hue [0-360), element 1 is the saturation [0-1], and element 2 is the lightness [0-1]
     */
    toHSL(): number[] {
        let sol: number[] = Array.from({length: 3})
        let rp = this.red/255
        let gp = this.green/255
        let bp = this.blue/255
        let cmax = Math.max(rp, gp, bp)
        let cmin = Math.min(rp, gp, bp)
        let delta = cmax - cmin
        sol[2] = (cmax + cmin)/2
        sol[1] = (delta === 0) ? 0 : (delta)/(1-Math.abs(2*sol[2]-1))
        if (delta === 0) sol[0] = 0
        else {
            if (cmax === rp) {
                sol[0] = 60 * (((gp-bp)/delta) % 6)
            } else if (cmax === gp) {
                sol[0] = 60 * (((bp-rp)/delta) + 2)
            } else if (cmax === bp) {
                sol[0] = 60 * (((rp-gp)/delta) + 4)
            }
        }
        if (sol[0] < 0) sol[0] += 360
        return sol
    }
    /**
     * lightens a color by a factor of f
     * @param f - the percent to lighten a color by [0-1] -- e.g. to lighten by 30%, f = 0.3
     * @returns the lightened color
     */
    lighten(f: number): color {
        let mid: number[] = this.toHSL();
        (mid[2] === 0) ? mid[2] += f : ((mid[2] + mid[2]*f) > 1) ? mid[2] = 1 : mid[2] += mid[2]*f;
        const sol = toRGB(mid)
        return sol
    }
    /**
     * darkens a color by a factor of f
     * @param f - the percent to darken a color by [0-1] -- e.g. to darken by 30%, f = 0.3
     * @returns the darkened color
     */
    darken(f: number): color {
        let mid: number[] = this.toHSL();
        (mid[2] === 1) ? mid[2] -= f : ((mid[2] - mid[2]*f) < 0) ? mid[2] = 0 : mid[2] -= mid[2]*f
        const sol = toRGB(mid)
        return sol
    }
    /**
     * computes a color's complement
     * @returns the complement of the color
     */
    comp(): color {
        let mid: number[] = this.toHSL();
        mid[0] += 180
        if(mid[0] > 359) mid[0] %= 360
        let sol = toRGB(mid)
        return sol
    }
    /**
     * computes the 2 colors needed to create a triadic color scheme with (this) color
     * @returns an array of colors, such that (this), element 0, and element 1 are 120 deg apart each on the color wheel
     */
    triadic(): color[] {
        let mid: number[][] = Array.from({length: 2}).map((h) => this.toHSL())
        mid[0][0] -= 120
        if (mid[0][0] < 0) mid[0][0] += 360
        mid[1][0] += 120
        if (mid[1][0] > 359) mid[1][0] %= 360
        let sol: color[] = mid.map(toRGB)
        return sol
    }
    /**
     * computes the 2 colors needed to create an analogous color scheme, with (this) color at the center
     * @returns an array of colors, such that elements 0 and 1 are 30 deg away from (this) color on the color wheel
     */
    analogous3(): color[] {
        let mid: number[][] = Array.from({length: 2}).map((h) => this.toHSL())
        mid[0][0] -= 30
        if (mid[0][0] < 0) mid[0][0] += 360
        mid[1][0] += 30
        if (mid[1][0] > 359) mid[1][0] %= 360
        let sol: color[] = mid.map(toRGB)
        return sol
    }
    /**
     * computes the 3 colors needed to create a square color scheme with (this) color
     * @returns an array of colors, such that (this) color and each color in the array are 90 deg away from each other on the color wheel
     */
    square(): color[] {
        let mid = Array.from({length: 3}).map((h) => this.toHSL()).map((h, i, a) => {
            if (i === 0) {
                h[0] += 90
                if (h[0] > 359) h[0] %= 360
            } else {
                h[0] = a[i-1][0] + 90
                if (h[0] > 359) h[0] %= 360
            }
            return h
        })
        let sol: color[] = mid.map(toRGB)
        return sol
    }
} 

/**
 * converts a color in hsl notation into rgb notation
 * @param l a color in hsl notation -- l[0] is hue [0-360), l[1] is saturation [0-1], l[2] is lightness [0-1]
 * @returns the converted color
 */
export function toRGB(l: number[]): color {
    let c: number = (1 - Math.abs(2*l[2]-1)) * l[1]
    let x: number = c * (1 - Math.abs((l[0]/60) % 2 - 1))
    let m: number = l[2] - (c/2)
    let rp: number = 0
    let gp: number = 0
    let bp: number = 0
    if ((0 <= l[0]) && (l[0] < 60)) {
        rp = c
        gp = x
    } else if ((60 <= l[0]) && (l[0] < 120)) {
        rp = x
        gp = c
    } else if ((120 <= l[0]) && (l[0] < 180)) {
        gp = c
        bp = x
    } else if ((180 <= l[0]) && (l[0] < 240)) {
        gp = x
        bp = c
    } else if ((240 <= l[0]) && (l[0] < 300)) {
        rp = x
        bp = c
    } else if ((300 <= l[0]) && (l[0] < 360)) {
        rp = c
        bp = x
    }

    return new color(Math.round((rp+m)*255), Math.round((gp+m)*255), Math.round((bp+m)*255))
}