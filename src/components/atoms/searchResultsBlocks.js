import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { REQUEST_URL } from '../dbhelper/constants';
import { handleGetPromise,handlePostJson } from '../dbhelper/methods';
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
            showModal:false,
            message:"please wait..."
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
    handleMakeAppoint(){
        this.setState({
            showModal:true,
        });
        var makeAppointment = handlePostJson(REQUEST_URL+`/userbooking/make`,{bookid:this.state.bookid});
        makeAppointment.then((data)=>{
            if(data.apointid){
                this.setState({
                    message:"appointed succeed, please collect the book in 7 days.",
                    bookstatus:"appointed",
                });
            }
        });

    }

    renderButtonForStatus() {
        if (this.state.bookstatus != "available") {
            return <Button variant="link">{this.state.bookstatus}</Button>
        } else {
            return <Button variant="primary" onClick={this.handleMakeAppoint.bind(this)}>appoint it</Button>
        }
    }

    onClickconfirmOk(){
        this.setState({
            showModal:false,
        });
    }
    render() {
        if (this.state.isLoading) {
            return <Loading />
        } else {
            return (
                <React.Fragment>
                    <Modal show={this.state.showModal}>
                        <Modal.Header></Modal.Header>
                        <Modal.Body>
                            {this.state.message}
                    </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="danger" onClick={this.onClickconfirmOk.bind(this)}>{"ok"}</Button>
                        </Modal.Footer>
                    </Modal>
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