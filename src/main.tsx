import React from 'react'
import * as ReactDOM from 'react-dom/client'

import * as Color from 'src/colors'

ReactDOM.createRoot(document.querySelector('#root')!).render(<PaletteApp/>)

function PaletteApp() {
    const [color, setColor] = React.useState<Color.color>()
    return (
        <>
            <nav>
                <ul>
                    <li><a href="#">home.</a></li>
                    <li><a href="./saved.html">saved colors.</a></li>
                </ul>
            </nav>
            <h1>colors.</h1>
            {(!color) ? <IndexComp fn={setColor}/> : <ResultComp c={color} fn={setColor}/>}
        </>
    )
}

function ColorForm(props: {fn: React.Dispatch<React.SetStateAction<Color.color|undefined>>}) {
    function makeColor(e): void {
        e.preventDefault()
        let e0 = e.currentTarget as HTMLFormElement
        props.fn(new Color.color(Number(e0.elements['rIn'].value), Number(e0.elements['gIn'].value), Number(e0.elements['bIn'].value)))
    }
    function random(e): void {
        e.preventDefault()
        let r: number[] = Array.from({length: 3})
        for (let i in r) r[i] = Math.round(Math.random() * 255)
        let e0 = e.currentTarget.form as HTMLFormElement
        e0.elements['rIn'].value = r[0]
        e0.elements['gIn'].value = r[1]
        e0.elements['bIn'].value = r[2]
    }
    return (
        <form onSubmit={makeColor}>
            <fieldset>
                <input type='number' min={0} max={255} name='rIn' id='rIn' defaultValue={0}/><br/>
                <label htmlFor="rIn">red.</label><br/><br/>
                <input type='number' min={0} max={255} name='gIn' id='gIn' defaultValue={0}/><br/>
                <label htmlFor="gIn">green.</label><br/><br/>
                <input type='number' min={0} max={255} name='bIn' id='bIn' defaultValue={0}/><br/>
                <label htmlFor="bIn">blue.</label><br/><br/>
                <button type="submit">submit.</button><button onClick={random}>random.</button><button type="reset">reset.</button>
            </fieldset>
        </form>
    )
}

function IndexComp(props: {fn: React.Dispatch<React.SetStateAction<Color.color|undefined>>}) {
    return <ColorForm fn={props.fn}/>
}

function ChipComp(props: {c: Color.color}) {
    return (
        <div className='chip-container'>
            <span className='chip' style={{background: `${props.c.hex}`}}></span><br/>
            <p className='chip-info'>
                {`rgb(${props.c.red}, ${props.c.green}, ${props.c.blue})`}<br/>
                hex code: {props.c.hex}
            </p>
        </div>
    )
}

function ResultComp(props: {c: Color.color, fn: React.Dispatch<React.SetStateAction<Color.color|undefined>>}) {
    return (
        <>
            <div id='form-results'>
                <h2>your color is:</h2><br/>
                <div id='form-color'>
                    <ChipComp c={props.c}/>
                </div>
            </div><br/><br/>
            <div id='results'>
                <SchemeComp c={props.c}/>
            </div>
            <ColorForm fn={props.fn}/>
        </>
    )
}

function SchemeComp(props: {c: Color.color}) {
    return (
        <>
            <h3>monochromatic scheme:</h3>
            <div id='mono'>
                <MonoScheme c={props.c}/>
            </div>
            <br/>
            <h3>complementary scheme:</h3>
            <div id='comp'>
                <CompScheme c={props.c} split={false}/>
            </div>
            <br/>
            <h3>split complementary scheme:</h3>
            <div id='split-comp'>
                <CompScheme c={props.c} split={true}/>
            </div>
            <h3>triadic scheme:</h3>
            <div id='triadic'>
                <TriadicScheme c={props.c}/>
            </div>
            <h3>square scheme:</h3>
            <div id='square'>
                <SquareScheme c={props.c}/>
            </div>
            <h3>analogous scheme (3 color):</h3>
            <div id='analogous3'>
                <AnalogousScheme c={props.c} n={3}/>
            </div>
            <h3>analogous scheme (5 color):</h3>
            <div id='analogous5'>
                <AnalogousScheme c={props.c} n={5}/>
            </div>
        </>
    )
}

function MonoScheme(props: {c: Color.color}) {
    return (
        <>
            <ChipComp c={props.c.darken(0.3)}/>
            <ChipComp c={props.c.darken(0.2)}/>
            <ChipComp c={props.c.darken(0.1)}/>
            <ChipComp c={props.c}/>
            <ChipComp c={props.c.lighten(0.1)}/>
            <ChipComp c={props.c.lighten(0.2)}/>
            <ChipComp c={props.c.lighten(0.3)}/>
        </>
    )
}

function CompScheme(props: {c: Color.color, split: boolean}) {
    if (!props.split) return (
        <>
            <ChipComp c={props.c}/>
            <ChipComp c={props.c.comp()}/>
        </>
    );
    else {
        let c0: Color.color = props.c.comp()
        let c1: Color.color[] = c0.analogous3()
        return (
            <>
                <ChipComp c={props.c}/>
                <ChipComp c={c1[0]}/>
                <ChipComp c={c1[1]}/>
            </>
        )
    }
}

function TriadicScheme(props: {c: Color.color}) {
    const c0 = props.c.triadic()
    return (
        <>
            <ChipComp c={c0[0]}/>
            <ChipComp c={props.c}/>
            <ChipComp c={c0[1]}/>
        </>
    )
}

function SquareScheme(props: {c: Color.color}) {
    const c0 = props.c.square()
    return (
        <>
            <ChipComp c={props.c}/>
            <ChipComp c={c0[0]}/>
            <ChipComp c={c0[1]}/>
            <ChipComp c={c0[2]}/>
        </>
    )
}

function AnalogousScheme(props: {c: Color.color, n: number}) {
    const c0 = props.c.analogous3();
    const c1 = c0[0].analogous3();
    const c2 = c0[1].analogous3();
    if (props.n === 3) return (
        <>
            <ChipComp c={c0[0]}/>
            <ChipComp c={props.c}/>
            <ChipComp c={c0[1]}/>
        </>
    );
    else return (
        <>
            <ChipComp c={c1[0]}/>
            <ChipComp c={c0[0]}/>
            <ChipComp c={props.c}/>
            <ChipComp c={c0[1]}/>
            <ChipComp c={c2[1]}/>
        </>
    )
}