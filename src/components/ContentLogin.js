import React from "react";
import { Form, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { REQUEST_URL } from './dbhelper/constants';
import { handlePostJson } from './dbhelper/methods';
import Loading from './Loading'
import "../css/contentBorder.css";
const rootPath = process.env.PUBLIC_URL;

class ContentLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            usertype: "normaluser",
            isLoading: false,
            isLogin: false,
            message: "Please wait..."
        }


    }

    handleOnchangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }
    handleOnchangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }
    handleOnchangeUsertype(e) {
        this.setState({
            usertype: e.target.value
        });
    }
    handleLogin(e) {

        const postdata = {
            username: this.state.username,
            password: this.state.password,
        }

        this.setState({
            isLoading: true
        });
        if (this.state.usertype == "normaluser") {

            var loginNormaluser = handlePostJson(REQUEST_URL + `/login`, postdata);
            loginNormaluser.then((respone) => {
                if (respone.length == 1) {

                    localStorage.setItem("logintoken", respone[0].token);
                    this.setState({

                        message: "Login succeed, welcome.",
                        isLogin:true,
                    });


                } else {
                    this.setState({
                        message: "password incorrect",
                        
                    })
                }
            })

        } else if (this.state.usertype == "manager") {
            var loginManager = handlePostJson(REQUEST_URL + `/login/manager`, postdata);
            loginManager.then((respone) => {
                if (respone.length == 1) {

                    localStorage.setItem("logintoken", respone[0].token);
                    this.setState({

                        message: "Login succeed, welcome.",
                        isLogin:true,
                    });

                } else {
                    this.setState({
                        message: "password incorrect",
                    })
                }
            })
        }


    }


    handleClose() {
    
        this.setState({
            isLoading: false,
        });
        if (this.state.isLogin) {
            window.location = `${rootPath}/`;
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="contentBorder">
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control onChange={this.handleOnchangeUsername.bind(this)} type="email" placeholder="Enter email" />

                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control onChange={this.handleOnchangePassword.bind(this)} type="password" />

                        </Form.Group>
                        <Form.Group controlId="usertype">
                            <Form.Label>user type:</Form.Label>
                            <Form.Control onChange={this.handleOnchangeUsertype.bind(this)} as="select">
                                <option value="normaluser">user</option>
                                <option value="manager">manager</option>
                            </Form.Control>
                        </Form.Group>
                        <Button onClick={this.handleLogin.bind(this)} variant="primary">
                            Login
                    </Button>
                    </Form>
                </div>
                <Modal show={this.state.isLoading} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Notice</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.message}</Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" onClick={this.handleClose.bind(this)}>
                            OK
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }

}

export default ContentLogin;