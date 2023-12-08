import React from "react";
import * as ReactDOM from "react-dom/client";
import { color } from "./color";
ReactDOM.createRoot(document.querySelector('#root')).render(React.createElement(App, null));
function App() {
    const [color, setColor] = React.useState();
    const [favColors, setFavColors] = React.useState();
    if (!color)
        return React.createElement(IndexComp, { colorSet: setColor });
    else
        return React.createElement(ResultComp, { c: color, favSet: setFavColors, colorSet: setColor });
}
function IndexComp(props) {
    const makeColor = (e) => {
        e.preventDefault();
        const data = e.target;
        const data0 = [...Object.entries(data).slice(0, 3).map(([k, v]) => v).map((r) => Number(r.value))];
        props.colorSet(new color(data0[0], data0[1], data0[2]));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { onSubmit: makeColor },
            React.createElement("input", { type: "number", name: "rIn", id: "rIn", min: "0", max: "255" }),
            React.createElement("br", null),
            React.createElement("label", { htmlFor: "rIn" }, "red."),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("input", { type: "number", name: "gIn", id: "gIn", min: "0", max: "255" }),
            React.createElement("br", null),
            React.createElement("label", { htmlFor: "gIn" }, "green."),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("input", { type: "number", name: "bIn", id: "bIn", min: "0", max: "255" }),
            React.createElement("br", null),
            React.createElement("label", { htmlFor: "bIn" }, "blue."),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("button", { type: "submit" }, "submit"),
            React.createElement("button", { type: "reset" }, "clear."))));
}
function ResultComp(props) {
    const makeColor = (e) => {
        e.preventDefault();
        const data = e.target;
        const data0 = [...Object.entries(data).slice(0, 3).map(([k, v]) => v).map((r) => Number(r.value))];
        props.colorSet(new color(data0[0], data0[1], data0[2]));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("h2", null,
            "your color is ",
            React.createElement("span", { style: { color: `${props.c.hex}` } }, props.c.hex)),
        React.createElement("br", null),
        React.createElement("span", { className: 'card', style: { background: `${props.c.hex}` } }),
        React.createElement("br", null),
        React.createElement("form", { onSubmit: makeColor },
            React.createElement("input", { type: "number", name: "rIn", id: "rIn", min: "0", max: "255" }),
            React.createElement("br", null),
            React.createElement("label", { htmlFor: "rIn" }, "red."),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("input", { type: "number", name: "gIn", id: "gIn", min: "0", max: "255" }),
            React.createElement("br", null),
            React.createElement("label", { htmlFor: "gIn" }, "green."),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("input", { type: "number", name: "bIn", id: "bIn", min: "0", max: "255" }),
            React.createElement("br", null),
            React.createElement("label", { htmlFor: "bIn" }, "blue."),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("button", { type: "submit" }, "submit"),
            React.createElement("button", { type: "reset" }, "clear."))));
}
//# sourceMappingURL=app.js.map