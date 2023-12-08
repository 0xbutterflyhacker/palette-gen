export class color {
    red;
    green;
    blue;
    hex;
    constructor(r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.hex = `#${(r > 15 ? r.toString(16) : '0' + r.toString(16))}${(g > 15 ? g.toString(16) : '0' + g.toString(16))}${(b > 15 ? b.toString(16) : '0' + b.toString(16))}`;
    }
}
//# sourceMappingURL=color.js.map