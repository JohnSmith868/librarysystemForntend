import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {useLocation, Redirect} from 'react-router-dom';
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
        
    
    handleLogout(){
        
        localStorage.setItem("logintoken","")
        window.location = `${rootPath}/`;
    }

    render(){
        const {usertype} = this.state;
        if(usertype == "customer"){
            return (
                <Navbar fixed="top" bg="dark" expand="lg" variant="dark">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse  id="basic-navbar-nav">
                    <Nav>
                        <LinkContainer to={`/`}>
                        <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to={`/register`}>
                        <Nav.Link>Register</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={`/login`}>
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
                <LinkContainer to={`/`}>
                <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to={`/myappointment`}>
                <Nav.Link>My Appointment</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/myborrow`}>
                <Nav.Link>My Borrow</Nav.Link>
                </LinkContainer>
                
                <Nav.Link onClick={this.handleLogout.bind(this)}>Logout</Nav.Link>
                
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
                <LinkContainer to={`/`}>
                <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to={`/allAppointments`}>
                <Nav.Link>Appointments</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/bookmanagement`}>
                <Nav.Link>Book management</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/logout`}>
                <Nav.Link onClick={this.handleLogout.bind(this)}>Logout</Nav.Link>
                </LinkContainer>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
            );
        }
        
    }
}

export default NavBar