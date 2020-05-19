import React from "react";
import { Form, Button } from 'react-bootstrap';
import "../css/contentBorder.css";

class ContentSearchbook extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <React.Fragment>
                <div className="contentBorder">
                    <Form>
                        <Form.Group controlId="search">
                            <Form.Label>Search Books</Form.Label>
                            <Form.Control type="text" placeholder="Enter keyword" />

                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}

export default ContentSearchbook;