import * as React from 'react';
import '../styles/style.css';
import { get } from '../backend';
import { ValidationWithProperties } from './ValidationWithProperties';

type Person = {
    firstName?: string;
    secondName?: string;
    middleName?: string;
}

type Error = {
    firstNameError?: string;
    secondNameError?: string;
    middleNameError?: string;
}

type SampleState = {
    person: Person;
    error: Error;
    errorText?: string;
}

export class ValidationSample extends React.Component<any, SampleState> {
    constructor(props) {
        super(props);
        this.state = {
            errorText: '',

            person: {
                firstName: '',
                secondName: '',
                middleName: ''
            },

            error: {
                firstNameError: '',
                secondNameError: '',
                middleNameError: ''
            }
        }
    }

    componentDidMount() {
        get('/api/users/person')
            .then((response: Person) => {
                this.setState({ person: response })
            })
            .catch(e => console.log(e));
    }

    render() {
        let {errorText, person, error} = this.state;

        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td >
                            <label style={ {marginRight: '10px'} } htmlFor="input1">Имя</label>
                        </td>
                        <td>
                            <input id="input1" type="text"
                                   onChange={ (e) => this.setPersonFieldByEvent(e, 'firstName') }
                                   value={ person.firstName }/>
                        </td>
                        <td>
                            <h2>{ error.firstNameError }</h2>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <label style={ {marginRight: '10px'} } htmlFor="input2">Фамилия</label>
                        </td>
                        <td>
                            <input id="input2" type="text"
                                   onChange={ (e) => this.setPersonFieldByEvent(e, 'secondName') }
                                   value={ person.secondName }/>
                        </td>
                        <td>
                            <h2>{ error.secondNameError }</h2>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <label style={ {marginRight: '10px'} } htmlFor="input3">Отчество</label>
                        </td>
                        <td>
                            <input id="input3" type="text"
                                   onChange={ (e) => this.setPersonFieldByEvent(e, 'middleName') }
                                   value={ person.middleName }/>
                        </td>
                        <td>
                            <div className='error-message'>
                            { error.middleNameError }
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div style={ {marginTop: '10px'} }>
                    <input id="button1" type="button" value="Validate"
                           onClick={ this.validate }
                    />
                </div>
                <h2>{ errorText }</h2>

                <ValidationWithProperties
                    firstName={'Test name'}
                secondName={'Test second name'}
                middleName={'Test middle name'}
                />
            </div >
        );
    }

    setPersonField = (value, field) => {
        /* let person = this.state.person;
         person[field] = value;

         this.setState({person});*/

        this.setState((prevState) => {
            return {person: {...prevState.person, [field]: value}}
        });
    };

    setPersonFieldByEvent = (e, field) => {
        let value = (e.target as HTMLInputElement).value;

        this.setPersonField(value, field);
    };

    validate = () => {
        if ((!this.state.person.firstName || !this.state.person) || this.state.person.firstName.length >= 7) {
            // this.setState((prevState) => {
            //     return {error: {...prevState.error, firstNameError: 'firstNameError'}}
            // });
            this.setState({
                error: {
                    firstNameError: 'firstNameError'
                }
            });
        } else {
            this.setState((prevState) => {
                return {error: {...prevState.error, firstNameError: ''}}
            });
        }
    };
    //
}
