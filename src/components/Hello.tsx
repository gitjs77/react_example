import * as React from "react";
import { get } from '../backend';
import './hello.css';

type  User = {
    id?: number;
    name?: string;
}
type HelloState = {
    name?: string;
    users?: Array<User>;
}

export class Hello extends React.Component<any, HelloState> {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentWillMount() {
        get('/api/users')
            .then((users: Array<any>) => {
                this.setState({ users })
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
                    {users.map((user, index) =>
                        <tr key={ index }>
                            <td>{ user.id }</td>
                            <td>{ user.name }</td>
                        </tr>
                    )}
                </table>
            </div>
        );
    }
}
