export class color {
    red: number
    green: number
    blue: number
    hex: string
    
    constructor(r: number, g: number, b: number) {
        this.red = r
        this.green = g
        this.blue = b
        this.hex = `#${(r > 15 ? r.toString(16) : '0' + r.toString(16))}${(g > 15 ? g.toString(16) : '0' + g.toString(16))}${(b > 15 ? b.toString(16) : '0' + b.toString(16))}`
    }
}