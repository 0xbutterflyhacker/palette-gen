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
                {(!color) ? <IndexComp colorSetter={setColor}/> : <ResultComp currentColor={color} colorSetter={setColor}/>}
            </div>
        </>
    )
}

function ColorForm(props: {colorSetter: React.Dispatch<React.SetStateAction<Color.color|undefined>>}) {
    const makeColor = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        let form: HTMLFormElement = e.currentTarget as HTMLFormElement
        props.colorSetter(new Color.color(Number(form.elements['rIn'].value), Number(form.elements['gIn'].value), Number(form.elements['bIn'].value)))
    }
    const randomizeColor = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        let r: number[] = Array.from({length: 3})
        for (let i in r) r[i] = Math.round(Math.random() * 255)
        let form: HTMLFormElement = e.currentTarget.form as HTMLFormElement
        form.elements['rIn'].value = r[0]
        form.elements['gIn'].value = r[1]
        form.elements['bIn'].value = r[2]
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
                <button type="submit">submit.</button><button onClick={randomizeColor}>random.</button><button type="reset">reset.</button>
            </fieldset>
        </form>
    )
}

function IndexComp(props: {colorSetter: React.Dispatch<React.SetStateAction<Color.color|undefined>>}) {
    return <ColorForm colorSetter={props.colorSetter}/>
}

function ChipComp(props: {currentColor: Color.color}) {
    const hsl: number[] = props.currentColor.toHSL()
    return (
        <div className='chip-container'>
            <p className='chip-info'>{`hsl(${Math.round(hsl[0])}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%)`}</p>
            <span className='chip' style={{background: `${props.currentColor.hex}`}}></span><br/>
            <p className='chip-info'>
                {`rgb(${props.currentColor.red}, ${props.currentColor.green}, ${props.currentColor.blue})`}<br/>
                <em>hex code:</em> {props.currentColor.hex}
            </p>
        </div>
    )
}

function ResultComp(props: {currentColor: Color.color, colorSetter: React.Dispatch<React.SetStateAction<Color.color|undefined>>}) {
    const savedList: Color.color[] = React.useContext(savedColors)
    const save = (): void => {
        let savedSet: Set<Color.color> = new Set(savedList)
        if (!savedSet.has(props.currentColor)) savedList.push(props.currentColor)
    }
    const toggleHide = (e: React.MouseEvent<HTMLButtonElement>, location: string): void => {
        let h = document.querySelector(`#${location}`);
        (h?.getAttribute('data-vis') === 'true') ? h.setAttribute('data-vis', 'false') : h?.setAttribute('data-vis', 'true')
    }
    return (
        <>
            <div id='form-results'>
                <h2>your color is:</h2><br/>
                <div id='form-color'>
                    <ChipComp currentColor={props.currentColor}/>
                </div>
                <button className='save' onClick={save} style={{border: `2px solid ${props.currentColor.hex}`}}>save this color.</button>
            </div>
            <button onClick={(e) => {
                toggleHide(e, 'schemes')
            }}>show/hide results.</button>
            <div id='schemes' data-vis='true'>
                <SchemeComp currentColor={props.currentColor}/>
            </div>
            <button onClick={(e) => {
                toggleHide(e, 'visibility')
            }}>show/hide visibility.</button>
            <div id='visibility' data-vis='true'>
                <VisibilityComp currentColor={props.currentColor}/>
            </div>
            <ColorForm colorSetter={props.colorSetter}/>
        </>
    )
}

function VisibilityComp(props: {currentColor: Color.color}) {
    const baseColors: React.JSX.Element[] = [new Color.color(0, 0, 0), new Color.color(55, 55, 55), new Color.color(127, 127, 127), new Color.color(210, 210, 210), new Color.color(255, 255, 255)]
    .map((l) => <VisibilityBox text={l} background={props.currentColor} key={`${props.currentColor.hex} + ${l.hex}`}/>)
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

function SchemeComp(props: {currentColor: Color.color}) {
    return (
        <>
            <h3>monochromatic scheme:</h3>
            <div id='mono'>
                <MonoScheme currentColor={props.currentColor}/>
            </div>
            <br/>
            <h3>complementary scheme:</h3>
            <div id='comp'>
                <CompScheme currentColor={props.currentColor} split={false}/>
            </div>
            <br/>
            <h3>split complementary scheme:</h3>
            <div id='split-comp'>
                <CompScheme currentColor={props.currentColor} split={true}/>
            </div>
            <h3>triadic scheme:</h3>
            <div id='triadic'>
                <TriadicScheme currentColor={props.currentColor}/>
            </div>
            <h3>square scheme:</h3>
            <div id='square'>
                <SquareScheme currentColor={props.currentColor}/>
            </div>
            <h3>analogous scheme (3 color):</h3>
            <div id='analogous3'>
                <AnalogousScheme currentColor={props.currentColor} schemeSize={3}/>
            </div>
            <h3>analogous scheme (5 color):</h3>
            <div id='analogous5'>
                <AnalogousScheme currentColor={props.currentColor} schemeSize={5}/>
            </div>
        </>
    )
}

function MonoScheme(props: {currentColor: Color.color}) {
    return (
        <>
            <ChipComp currentColor={props.currentColor.darken(0.3)}/>
            <ChipComp currentColor={props.currentColor.darken(0.2)}/>
            <ChipComp currentColor={props.currentColor.darken(0.1)}/>
            <ChipComp currentColor={props.currentColor}/>
            <ChipComp currentColor={props.currentColor.lighten(0.1)}/>
            <ChipComp currentColor={props.currentColor.lighten(0.2)}/>
            <ChipComp currentColor={props.currentColor.lighten(0.3)}/>
        </>
    )
}

function CompScheme(props: {currentColor: Color.color, split: boolean}) {
    if (!props.split) return (
        <>
            <ChipComp currentColor={props.currentColor}/>
            <ChipComp currentColor={props.currentColor.comp()}/>
        </>
    );
    else {
        const complement: Color.color = props.currentColor.comp()
        const splitComp: Color.color[] = complement.analogous3()
        return (
            <>
                <ChipComp currentColor={props.currentColor}/>
                <ChipComp currentColor={splitComp[0]}/>
                <ChipComp currentColor={splitComp[1]}/>
            </>
        )
    }
}

function TriadicScheme(props: {currentColor: Color.color}) {
    const triad: Color.color[] = props.currentColor.triadic()
    return (
        <>
            <ChipComp currentColor={triad[0]}/>
            <ChipComp currentColor={props.currentColor}/>
            <ChipComp currentColor={triad[1]}/>
        </>
    )
}

function SquareScheme(props: {currentColor: Color.color}) {
    const square: Color.color[] = props.currentColor.square()
    return (
        <>
            <ChipComp currentColor={props.currentColor}/>
            <ChipComp currentColor={square[0]}/>
            <ChipComp currentColor={square[1]}/>
            <ChipComp currentColor={square[2]}/>
        </>
    )
}

function AnalogousScheme(props: {currentColor: Color.color, schemeSize: number}) {
    const analagous: Color.color[] = props.currentColor.analogous3()
    const analagousLeft: Color.color = analagous[0].analogous3()[0]
    const analagousRight: Color.color = analagous[1].analogous3()[1]
    if (props.schemeSize === 3) return (
        <>
            <ChipComp currentColor={analagous[0]}/>
            <ChipComp currentColor={props.currentColor}/>
            <ChipComp currentColor={analagous[1]}/>
        </>
    );
    else return (
        <>
            <ChipComp currentColor={analagousLeft}/>
            <ChipComp currentColor={analagous[0]}/>
            <ChipComp currentColor={props.currentColor}/>
            <ChipComp currentColor={analagous[1]}/>
            <ChipComp currentColor={analagousRight}/>
        </>
    )
}

function SavedPage() {
    const savedList: React.JSX.Element[] = React.useContext(savedColors)
    .map((h) => <ChipComp currentColor={h} key={h.hex}/>)
    return (
        <>
            <h1>colors.</h1>
            <h3>saved colors:</h3>
            <div id='results'>
                <div id='colors'>
                    {(savedList.length === 0) ? <h5>no colors saved.</h5> : savedList}
                </div>
            </div>
        </>
    )
}