import * as React from "react";
import { Hello } from "./Hello";

interface HelloCallerState {
    secondName?: string;
}

export class HelloCaller extends React.Component<void, HelloCallerState> {
    constructor(){
        super();

        this.state = {
            secondName: 'Default second name.'
        }
    }

    /**
     * Use this syntax when you send this function to the another component through the props
     **/
    setSecondName = (secondName: string): void => {
        this.setState( { secondName: secondName })
    }

    render() {
        return (
            <div>
                {/*Call Hello component and send name props value
                to the constructor of the Hello component*/}
                <Hello
                    name={'Peta from props from HelloCaller'}
                    setSecondNameAtTheHelloCaller={ this.setSecondName }
                />

                <h2> { this.state.secondName } </h2>
            </div>
        );
    }
};
