export class color {
    red: number
    green: number
    blue: number
    hex: string

    constructor(r: number, g: number, b: number) {
        this.red = r
        this.green = g
        this.blue = b
        this.hex = `#${(r > 15) ? r.toString(16) : '0'+r.toString(16)}${(g > 15) ? g.toString(16) : '0'+g.toString(16)}${(b > 15) ? b.toString(16) : '0'+b.toString(16)}`
    }
}

export function toHSL(): number[] {
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
    else if (cmax === rp) {
        sol[0] = 60 * (((gp-bp)/delta) % 6)
    } else if (cmax === gp) {
        sol[0] = 60 * (((bp-rp)/delta) + 2)
    } else {
        sol[0] = 60 * (((rp-gp)/delta) + 4)
    }
    return sol
}