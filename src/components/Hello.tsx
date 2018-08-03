import * as React from "react";
import { get } from '../backend';
import './hello.css';

type HelloProps = {
    name: string;
    setSecondNameAtTheHelloCaller?(secondName: string): void;
    // setSecondNameAtTheHelloCaller?(secondName: string): () => void;
    // setSecondNameAtTheHelloCaller(): () => {}
}

type User = {
    id?: number;
    name?: string;
}
type HelloState = {
    name?: string;
    users: Array<User>;
}

export class Hello extends React.Component<HelloProps, HelloState> {
    constructor(props: HelloProps) {
        super(props);

        this.state = {
            name: props.name,
            users: []
        }
    }

    componentDidMount() {
        get('/api/users')
            .then((response: Array<User>) => {
                this.setState({ users: response })
            })
            .catch(e => console.log(e));
    }

    render() {
        const { users } = this.state;

        return (
            <div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                    </tr>
                    {
                        users.map((user, index) =>
                        <tr key={ index }>
                            <td>{ user.id }</td>
                            <td>{ user.name }</td>
                        </tr>
                        )
                    }
                </table>

                <div>
                    <h2>
                    { this.state.name }
                    </h2>
                </div>

                <button
                    onClick={ () => this.props.setSecondNameAtTheHelloCaller('Кран') }>Write second name
                </button>
            </div>
        );
    }
}
