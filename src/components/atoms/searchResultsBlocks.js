import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { REQUEST_URL } from '../dbhelper/constants';
import { handleGetPromise } from '../dbhelper/methods';
import Loading from '../Loading.js';

class SearchResultsBlocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            bookid: props.bookid,
            bookname: "",
            bookauthor: "",
            bookisbn: "",
            bookstatus: "",
        }
    }

    componentDidMount() {
        var getBooksDetail = handleGetPromise(REQUEST_URL + `/books/${this.state.bookid}`);
        getBooksDetail.then((details) => {
            this.setState({
                bookname: details.response.bookname,
                bookauthor: details.response.author,
                bookisbn: details.response.ISBN,
                bookstatus: details.response.status,
                isLoading: false,
            });
        });
    }
    renderButtonForStatus() {
        if (this.state.bookstatus != "available") {
            return <Button variant="link">{this.state.bookstatus}</Button>
        }else{
            return <Button variant="primary">appoint it</Button>
        }
    }

    render() {
        if (this.state.isLoading) {
            return <Loading />
        } else {
            return(
            <React.Fragment>
            <tr>
                <td>{this.state.bookid}</td>
                <td>{this.state.bookname}</td>
                <td>{this.state.bookauthor}</td>
                <td>{this.state.bookisbn}</td>
                <td>{this.renderButtonForStatus()}</td>
            </tr>
            </React.Fragment>
            )
        }
    }

}

export default SearchResultsBlocks;