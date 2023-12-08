import React from "react"
import * as ReactDOM from "react-dom/client"

import { color } from "./color"

ReactDOM.createRoot(document.querySelector('#root')!).render(<App/>)

function App() {
    const [color, setColor] = React.useState<color>()
    const [favColors, setFavColors] = React.useState<color[]>()
    if (!color) return <IndexComp colorSet={setColor}/>
    else return <ResultComp c={color} favSet={setFavColors} colorSet={setColor}/>
}

function IndexComp(props: {colorSet: (c: color) => any}) {
    const makeColor = (e) => {
        e.preventDefault()
        const data = e.target as HTMLFormElement
        const data0 = [...Object.entries(data).slice(0, 3).map(([k, v]) => v as HTMLInputElement).map((r) => Number(r.value))]
        props.colorSet(new color(data0[0], data0[1], data0[2]))
    }
    return (
        <>
            <form onSubmit={makeColor}>
                <input type="number" name="rIn" id="rIn" min="0" max="255"/><br/>
                <label htmlFor="rIn">red.</label><br/><br/>
                <input type="number" name="gIn" id="gIn" min="0" max="255"/><br/>
                <label htmlFor="gIn">green.</label><br/><br/>
                <input type="number" name="bIn" id="bIn" min="0" max="255"/><br/>
                <label htmlFor="bIn">blue.</label><br/><br/>
                <button type="submit">submit</button><button type="reset">clear.</button>
            </form>
        </>
    )
}
function ResultComp(props: {c: color, colorSet: (c: color) => any, favSet: (c: color[]) => any}) {
    const makeColor = (e) => {
        e.preventDefault()
        const data = e.target as HTMLFormElement
        const data0 = [...Object.entries(data).slice(0, 3).map(([k, v]) => v as HTMLInputElement).map((r) => Number(r.value))]
        props.colorSet(new color(data0[0], data0[1], data0[2]))
    }
    return (
        <>
            <h2>your color is <span style={{color: `${props.c.hex}`}}>{props.c.hex}</span></h2><br/>
            <span className='card' style={{background: `${props.c.hex}`}}></span><br/>
            <form onSubmit={makeColor}>
                <input type="number" name="rIn" id="rIn" min="0" max="255"/><br/>
                <label htmlFor="rIn">red.</label><br/><br/>
                <input type="number" name="gIn" id="gIn" min="0" max="255"/><br/>
                <label htmlFor="gIn">green.</label><br/><br/>
                <input type="number" name="bIn" id="bIn" min="0" max="255"/><br/>
                <label htmlFor="bIn">blue.</label><br/><br/>
                <button type="submit">submit</button><button type="reset">clear.</button>
            </form>
        </>
    )
}