import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import routes, { rootPath } from '../routers';
import {handlePostJson} from './dbhelper/methods';
import {REQUEST_URL} from './dbhelper/constants';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLogin:false,
            usertype:'customer',
        }
    }
    componentDidMount(){
        var checkLogin = handlePostJson(REQUEST_URL+`/login/check`);
        checkLogin.then((data)=>{
            this.setState({
                isLogin:data.isLogin,
                
            });
            if(data.usertype){
                this.setState({
                    usertype:data.usertype,
                });
            }
        });
    }

    render(){
        const {usertype} = this.state;
        if(usertype == "customer"){
            return (
                <Navbar fixed="top" bg="dark" expand="lg" variant="dark">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse  id="basic-navbar-nav">
                    <Nav>
                        <LinkContainer to={`${rootPath}/`}>
                        <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to={`${rootPath}/register`}>
                        <Nav.Link>Register</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={`${rootPath}/login`}>
                        <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
    
            );
    
        }else if(usertype=="normaluser"){
            return(
            <Navbar fixed="top" bg="dark" expand="lg" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse  id="basic-navbar-nav">
            <Nav>
                <LinkContainer to={`${rootPath}/`}>
                <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to={`${rootPath}/myappointment`}>
                <Nav.Link>My Appointment</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`${rootPath}/myborrow`}>
                <Nav.Link>My Borrow</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`${rootPath}/logout`}>
                <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
            );
        }else if(usertype=="manager"){
            return(
            <Navbar fixed="top" bg="dark" expand="lg" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse  id="basic-navbar-nav">
            <Nav>
                <LinkContainer to={`${rootPath}/`}>
                <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to={`${rootPath}/appointmentsmanagement`}>
                <Nav.Link>Appointments</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`${rootPath}/logout`}>
                <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
            );
        }
        
    }
}

export default NavBar