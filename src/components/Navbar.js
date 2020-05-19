import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import routes, { rootPath } from '../routers';

class NavBar extends React.Component{
    constructor(props){
        super(props);

    }

    render(){

        return (
            <Navbar fixed="top" bg="dark" expand="lg" variant="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse  id="basic-navbar-nav">
                <Nav>
                    <LinkContainer to={`${rootPath}/`}>
                    <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    
                    <LinkContainer to={`${rootPath}/sportsground`}>
                    <Nav.Link>Sports grounds</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={`${rootPath}/map`}>
                    <Nav.Link>Map</Nav.Link>
                    </LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Navbar>

        );

    }
}

export default NavBar