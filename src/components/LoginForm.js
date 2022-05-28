import React from 'react';
import { Redirect } from 'react-router-dom';
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



class LoginForm extends React.Component {

    state = {
        error: false
    }

    componentDidMount() {
    
    }


    login = (e) => {
        e.preventDefault();
        this.setState({error: false});
        let state = this.state;
        api.login(state)
                .then(response => {
                    if (response) {
                        this.setState({ logined: true });
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
        if (this.state.logined) {
            return <Redirect to="/pk/" />
        }
        return (
            <Card className="login-card">
                <CardBody>
                    <Form action="" method="post" className="form-horizontal login-form" onSubmit={this.login}>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" id="email" name="email" placeholder="me@gmail.com" onChange={this.handleInputChange} autoComplete="email" value={this.state.email || ''} required/>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="password">Пароль</Label>
                            <Input type="password" id="password" name="password" onChange={this.handleInputChange}  autoComplete="password" value={this.state.password || ''} required/>
                        </FormGroup>

                        <FormGroup>
                            <Button type="submit" size="md" color="primary" className="mr-2"><i className="fa fa-dot-circle-o"></i> Войти</Button>
                            <Button size="md" color="link" className="">Забыли пароль?</Button>
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


export default LoginForm;