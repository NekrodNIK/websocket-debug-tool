import React from "react";
import JSONInput from "react-json-editor-ajrm"
// @ts-ignore
import locale from "react-json-editor-ajrm/locale/en";
import "./styles/app.scss"

interface AppState{
    output_value: object,
    input_value: object
}

class App extends React.Component{
    state: AppState
    private ws: WebSocket;
    constructor(props: {}) {
        super(props)
        this.state = {
            output_value: {},
            input_value: {},
        }
        this.ws = new WebSocket("ws://localhost:8000/ws")
        this.ws.onmessage = (event) => {
            this.setState({output_value: JSON.parse(event.data)})
        }
    }

    render() {
        return (
            <div id="app_div">
                <JSONInput locale={locale} height="100%" width="100%" placeholder={this.state.input_value} onChange={
                    (event: { jsObject: Object }) => {
                        this.setState({input_value: event.jsObject})
                    }
                }/>
                <button onClick={() => {
                    this.ws.send(JSON.stringify(this.state.input_value))
                }}>Send</button>
                <JSONInput locale={locale} height="100%" width="100%" viewOnly placeholder={this.state.output_value}/>
            </div>
        );
    }
}

export default App;
