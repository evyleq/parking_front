import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as api from '../api/v1';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Alert
} from 'reactstrap';
import Ymap from '../components/YMap';



class SignupForm extends React.Component {

    state = {
        error: false
    }

    componentDidMount() {
    
    }


    signup = (e) => {
        e.preventDefault();
        this.setState({error: false});
        let state = this.state;
        if (state.password !== state.passwordConfirmation) {
            this.setState({error: 'Пароли не совпадают'});
            return;
        }
        api.signup(state)
                .then(response => {
                    if (response) {
                        this.setState({ regstered: true });
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.setState({error: error.message});
                });

    }

    onDismiss = () => {
        this.setState({error: false});
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }


    render() {
        if (this.state.registered) {
            return <Redirect to="/pk/login" />
        }
        return (
            <Card className="signup-card">
                <CardBody>
                    <Form action="" method="post" className="form-horizontal" onSubmit={this.signup}>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" id="email" name="email" placeholder="me@gmail.com" onChange={this.handleInputChange} autoComplete="email" value={this.state.email || ''} required/>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="password">Пароль</Label>
                            <Input type="password" id="password" name="password" onChange={this.handleInputChange}  autoComplete="password" value={this.state.password || ''} required/>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="passwordConfirmation">Подтверждение пароля</Label>
                            <Input type="passwordConfirmation" id="passwordConfirmation" name="passwordConfirmation" onChange={this.handleInputChange}  autoComplete="passwordConfirmation" value={this.state.passwordConfirmation || ''} />
                        </FormGroup>

                        <FormGroup>
                            <Button type="submit" size="md" color="primary" className="mr-2"><i className="fa fa-dot-circle-o"></i> Зарегистрироваться</Button>
                            <Link to='/pk/login' className="btn btn-link btn-md">Войти</Link>
                        </FormGroup>
                        <Alert color="danger" isOpen={this.state.error} toggle={this.onDismiss} fade={true}>
                            {this.state.error}
                        </Alert>                     
                    </Form>
                </CardBody>
            </Card>
        );
    }
}


export default SignupForm;