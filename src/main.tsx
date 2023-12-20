import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

import * as Color from 'src/colors'

const savedColors = React.createContext<Color.color[]>([])

ReactDOM.createRoot(document.querySelector('#root')!).render(<App/>)

export default function App() {
    return (
        <Router>
            <nav id='navbar'>
                <ul>
                    <li><Link to='/'>home.</Link></li>
                    <li><Link to='/saved'>saved colors.</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' Component={PalettePage}/>
                <Route path='/saved' Component={SavedPage}/>
            </Routes>
        </Router>
    )
}

function PalettePage() {
    const [color, setColor] = React.useState<Color.color>()
    return (
        <>
            <h1>colors.</h1>
            <div id='content'>
                {(!color) ? <IndexComp fn={setColor}/> : <ResultComp c={color} fn={setColor}/>}
            </div>
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
                <label htmlFor="rIn">red.</label><br/>
                <input type='number' min={0} max={255} name='rIn' id='rIn' defaultValue={0}/><br/><br/>
                <label htmlFor="gIn">green.</label><br/>
                <input type='number' min={0} max={255} name='gIn' id='gIn' defaultValue={0}/><br/><br/>
                <label htmlFor="bIn">blue.</label><br/>
                <input type='number' min={0} max={255} name='bIn' id='bIn' defaultValue={0}/><br/><br/>
                <button type="submit">submit.</button><button onClick={random}>random.</button><button type="reset">reset.</button>
            </fieldset>
        </form>
    )
}

function IndexComp(props: {fn: React.Dispatch<React.SetStateAction<Color.color|undefined>>}) {
    return <ColorForm fn={props.fn}/>
}

function ChipComp(props: {c: Color.color}) {
    const c0 = props.c.toHSL()
    return (
        <div className='chip-container'>
            <p className='chip-info'>{`hsl(${Math.round(c0[0])}, ${Math.round(c0[1] * 100)}%, ${Math.round(c0[2] * 100)}%)`}</p>
            <span className='chip' style={{background: `${props.c.hex}`}}></span><br/>
            <p className='chip-info'>
                {`rgb(${props.c.red}, ${props.c.green}, ${props.c.blue})`}<br/>
                hex code: {props.c.hex}
            </p>
        </div>
    )
}

function ResultComp(props: {c: Color.color, fn: React.Dispatch<React.SetStateAction<Color.color|undefined>>}) {
    const s = React.useContext(savedColors)
    function save(): void {
        let s0 = new Set(s)
        if (!s0.has(props.c)) s.push(props.c)
    }
    function toggleHide(e, location: string): void {
        let h = document.querySelector(`#${location}`);
        (h?.getAttribute('data-vis') === 'true') ? h.setAttribute('data-vis', 'false') : h?.setAttribute('data-vis', 'true')
    }
    return (
        <>
            <div id='form-results'>
                <h2>your color is:</h2><br/>
                <div id='form-color'>
                    <ChipComp c={props.c}/>
                </div>
                <button className='save' onClick={save} style={{border: `2px solid ${props.c.hex}`}}>save this color.</button>
            </div>
            <button onClick={(e) => {
                toggleHide(e, 'schemes')
            }}>show/hide results.</button>
            <div id='schemes' data-vis='true'>
                <SchemeComp c={props.c}/>
            </div>
            <button onClick={(e) => {
                toggleHide(e, 'visibility')
            }}>show/hide visibility.</button>
            <div id='visibility' data-vis='true'>
                <VisibilityComp color={props.c}/>
            </div>
            <ColorForm fn={props.fn}/>
        </>
    )
}

function VisibilityComp(props: {color: Color.color}) {
    const baseColors = [new Color.color(0, 0, 0), new Color.color(55, 55, 55), new Color.color(127, 127, 127), new Color.color(210, 210, 210), new Color.color(255, 255, 255)].map((l) => <VisibilityBox text={l} background={props.color} key={`${props.color.hex} + ${l.hex}`}/>)
    return (
        <>
            {baseColors}
        </>
    )
}
function VisibilityBox(props: {text: Color.color, background: Color.color}) {
    return (
        <div className='vis-group'>
            <h3>{`${props.text.hex} on ${props.background.hex}`}</h3>
            <div style={{background: `${props.background.hex}`, color: `${props.text.hex}`, border: `2px solid ${props.text.hex}`}}>
                <h2>large title.</h2>
                <h5>subtitle.</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae suscipit tellus mauris. Vitae turpis massa sed elementum tempus egestas sed sed. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus. Urna porttitor rhoncus dolor purus non enim. Sit amet est placerat in egestas erat imperdiet sed euismod. Blandit volutpat maecenas volutpat blandit aliquam. Porttitor eget dolor morbi non arcu risus quis varius. Posuere ac ut consequat semper viverra nam. Ac orci phasellus egestas tellus. Pharetra convallis posuere morbi leo urna. Dictumst vestibulum rhoncus est pellentesque elit. Id aliquet lectus proin nibh nisl. Vel orci porta non pulvinar neque laoreet suspendisse. Volutpat lacus laoreet non curabitur gravida arcu ac.</p>
            </div>
            <h3>{`${props.background.hex} on ${props.text.hex}`}</h3>
            <div style={{background: `${props.text.hex}`, color: `${props.background.hex}`, border: `2px solid ${props.background.hex}`}}>
                <h2>large title.</h2>
                <h5>subtitle.</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae suscipit tellus mauris. Vitae turpis massa sed elementum tempus egestas sed sed. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus. Urna porttitor rhoncus dolor purus non enim. Sit amet est placerat in egestas erat imperdiet sed euismod. Blandit volutpat maecenas volutpat blandit aliquam. Porttitor eget dolor morbi non arcu risus quis varius. Posuere ac ut consequat semper viverra nam. Ac orci phasellus egestas tellus. Pharetra convallis posuere morbi leo urna. Dictumst vestibulum rhoncus est pellentesque elit. Id aliquet lectus proin nibh nisl. Vel orci porta non pulvinar neque laoreet suspendisse. Volutpat lacus laoreet non curabitur gravida arcu ac.</p>
            </div>
        </div>
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

function SavedPage() {
    const c = React.useContext(savedColors).map((h) => <ChipComp c={h} key={h.hex}/>)
    return (
        <>
            <h1>colors.</h1>
            <h3>saved colors:</h3>
            <div id='results'>
                <div id='colors'>
                    {(c.length === 0) ? <h5>no colors saved.</h5> : c}
                </div>
            </div>
        </>
    )
}