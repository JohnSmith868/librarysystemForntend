import React from "react";
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { REQUEST_URL } from './dbhelper/constants';
import { handlePostJson } from './dbhelper/methods';
import Loading from './Loading'
import "../css/contentBorder.css";
const rootPath = process.env.PUBLIC_URL;
class ContentRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirmpwd: "",
            isLoading: false,
            isRegister: false,
            showAlert: false,
            alertMsg: "something empty.",
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
    handleOnchangeConfirmPwd(e) {
        this.setState({
            confirmpwd: e.target.value
        });
    }
    handleRegister(e) {
        this.setState({
            isLoading: true,
        })
        const { username, password, confirmpwd } = this.state;
        if (username == "" || password == "" || confirmpwd == "") {
            this.setState({
                showAlert: true,
                isLoading: false,
            });
        } else if (password != confirmpwd) {
            this.setState({
                showAlert: true,
                isLoading: false,
                alertMsg: "password no match, pleas check again."
            });
        }else{
            const postdata = {
                username:this.state.username,
                password:this.state.password,
            }
            var registerAccount = handlePostJson(REQUEST_URL+`/register`, postdata);
            registerAccount.then((data)=>{
                if(data.succeed){
                    this.setState({
                        message:"register succeed.",
                        isRegister:true,
                        
                    });
                }
            });
        }



    }


    handleClose() {
        this.setState({
            isLoading: false,
        });
        if (this.state.isRegister) {
            window.location.href = `${rootPath}/login`;
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
                        <Form.Group controlId="confirmpwd">
                            <Form.Label>Confirm password:</Form.Label>
                            <Form.Control onChange={this.handleOnchangeConfirmPwd.bind(this)} type="password">
                            </Form.Control>
                        </Form.Group>
                        <Button onClick={this.handleRegister.bind(this)} variant="primary">
                            Register
                    </Button>
                    <Alert variant="danger" show={this.state.showAlert} >{this.state.alertMsg}</Alert>
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

export default ContentRegister;