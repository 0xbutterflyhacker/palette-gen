import React from 'react'
import * as ReactDOM from 'react-dom/client'

import * as Color from 'src/colors'

ReactDOM.createRoot(document.querySelector('#root')!).render(<App/>)

function App() {
    const [color, setColor] = React.useState<Color.color>()
    return (
        <>
            <h1>colors.</h1>
            {(!color) ? <IndexComp fn={setColor}/> : <ResultComp c={color}/>}
        </>
    )
}

function ColorForm(props: {fn: React.Dispatch<React.SetStateAction<Color.color|undefined>>}) {
    function makeColor(e): void {
        e.preventDefault()
        let e0 = e.currentTarget as HTMLFormElement
        props.fn(new Color.color(e0.elements['rIn'].value, e0.elements['gIn'].value, e0.elements['bIn'].value))
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
                <button type="submit">submit.</button><button type="reset">reset.</button>
            </fieldset>
        </form>
    )
}

function IndexComp(props: {fn: React.Dispatch<React.SetStateAction<Color.color|undefined>>}) {
    return <ColorForm fn={props.fn}/>
}

function ResultComp(props: {c: Color.color}) {
    return (
        <>
            <h3>your color is: {props.c.hex}</h3>
        </>
    )
}