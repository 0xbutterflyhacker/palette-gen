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

    lighten(f: number): color {
        let mid: number[] = this.toHSL();
        (mid[2] === 0) ? mid[2] += f : ((mid[2] + mid[2]*f) > 1) ? mid[2] = 1 : mid[2] += mid[2]*f;
        const sol = toRGB(mid)
        return sol
    }
    darken(f: number): color {
        let mid: number[] = this.toHSL();
        (mid[2] === 1) ? mid[2] -= f : ((mid[2] - mid[2]*f) < 0) ? mid[2] = 0 : mid[2] -= mid[2]*f
        const sol = toRGB(mid)
        return sol
    }
    comp(): color {
        let mid: number[] = this.toHSL();
        mid[0] += 180
        if(mid[0] > 359) mid[0] %= 360
        let sol = toRGB(mid)
        return sol
    }
    triadic(): color[] {
        let mid: number[][] = Array.from({length: 2}).map((h) => this.toHSL())
        mid[0][0] -= 120
        if (mid[0][0] < 0) mid[0][0] += 360
        mid[1][0] += 120
        if (mid[1][0] > 359) mid[1][0] %= 360
        let sol: color[] = mid.map(toRGB)
        return sol
    }
    analogous3(): color[] {
        let mid: number[][] = Array.from({length: 2}).map((h) => this.toHSL())
        mid[0][0] -= 30
        if (mid[0][0] < 0) mid[0][0] += 360
        mid[1][0] += 30
        if (mid[1][0] > 359) mid[1][0] %= 360
        let sol: color[] = mid.map(toRGB)
        return sol
    }
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