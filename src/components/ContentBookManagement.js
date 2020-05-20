import React from 'react';
import { Modal,Table, Alert, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { REQUEST_URL } from './dbhelper/constants';
import { handleGetPromise, handlePostJson } from './dbhelper/methods';
import Loading from './Loading.js';
import ModifyBookInfoBlock from './atoms/modifyBookInfoBlocks';


class ContentBookManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookname: "",
            author: "",
            isbn: "",
            keyword:"",
            result:[],
            showAlert: false,
            showModal: false,
            isLoading:false,
            message:"uploading....",
        }

    }

    handleOnchangeBookName(e) {
        this.setState({
            bookname: e.target.value,
        })
    }
    handleOnchangeAuthor(e) {
        this.setState({
            author: e.target.value,
        })
    }
    handleOnchangeISBN(e) {
        this.setState({
            isbn: e.target.value,
        })
    }

    handleOnchangeKeyword(e){
        this.setState({
            keyword: e.target.value,
        })
    }

    handleUpload() {
        const { bookname, author, isbn } = this.state;
        const postdata = {
            bookname:bookname,
            author:author,
            isbn:isbn,
        }
        if (bookname == "" || author == "" || isbn == ""){
            this.setState({
                showAlert:true,
            });
        }else{
            this.setState({
                showModal:true,
            })
            var uploadBook = handlePostJson(REQUEST_URL+`/managebooks/upload`,postdata);
            uploadBook.then((data)=>{
                if(data.succeed){
                    this.setState({
                        message:"succeed upload a new book."
                    })
                }else{
                    this.setState({
                        message:"something error, please try again."
                    });
                }
            })
        }
    }

    handleSearch(){
        this.setState({
            isLoading: true,
            result:[],
        });
        var searchBook = handleGetPromise(REQUEST_URL + `/books?keyword=${this.state.keyword}`);

        searchBook.then((res) => {

            if (res.response.length > 0) {
                res.response.map((booksinfo, key) => {
                    this.setState(prveState=>({
                        result: [...prveState.result,booksinfo.bookid]
                    }))
                });
                this.setState({
                    isLoading: false,
                    isSearch:true,
                });
            }else{
                this.setState({
                    isLoading:false,
                    noresult:true,
                    isSearch:false,
                });
            }
        });
    }

    renderResult() {
        if (this.state.isLoading) {
            return (<Loading />)
        } else if(this.state.isSearch) {
            return (
                <React.Fragment>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book Name</th>
                                <th>Book Author</th>
                                <th>Book ISBN</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.result.map((data, index) => {
                                return (<ModifyBookInfoBlock bookid={data} key={index}/>)
                            })}
                        </tbody>
                    </Table>
                </React.Fragment>
            );
        }else if(this.state.noresult){
            return <p>no result found. sorry.</p>
        }
    }
    onClickconfirmOk(){
        this.setState({
            showModal:false,
        })
    }
    render() {
        return (
            <React.Fragment>
                <Tabs defaultActiveKey={"uploadbook"} transition={false} id="uncontrolled-tab-example">
                    <Tab eventKey="uploadbook" title="Upload new book">
                        <Form>
                            <Form.Group controlId="bookname">
                                <Form.Label>Book Name:</Form.Label>
                                <Form.Control onChange={this.handleOnchangeBookName.bind(this)} type="text" placeholder="Enter book name" />
                            </Form.Group>
                            <Form.Group controlId="bookauthor">
                                <Form.Label>Book Author:</Form.Label>
                                <Form.Control onChange={this.handleOnchangeAuthor.bind(this)} type="text" placeholder="Enter author" />
                            </Form.Group>
                            <Form.Group controlId="ISBN">
                                <Form.Label>Book ISBN:</Form.Label>
                                <Form.Control onChange={this.handleOnchangeISBN.bind(this)} type="number" placeholder="Enter ISBN" />
                            </Form.Group>
                        </Form>
                        <Button variant="primary" onClick={this.handleUpload.bind(this)}>upload</Button>
                        <Alert show={this.state.showAlert} variant="danger">something empty. </Alert>
                    </Tab>
                    <Tab eventKey="modifybook" title="Book info modification">
                    <Form>
                        <Form.Group controlId="search">
                            <Form.Label>Search Books</Form.Label>
                            <Form.Control onChange={this.handleOnchangeKeyword.bind(this)} type="text" placeholder="Enter keyword" />

                        </Form.Group>
                        <Button onClick={this.handleSearch.bind(this)} variant="primary">
                            Search
                        </Button>
                    </Form>
                    {this.renderResult()}
                    </Tab>
                    
                </Tabs>

                <Modal show={this.state.showModal}>
                        <Modal.Header></Modal.Header>
                        <Modal.Body>
                            {this.state.message}
                    </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="danger" onClick={this.onClickconfirmOk.bind(this)}>{"ok"}</Button>
                        </Modal.Footer>
                    </Modal>
            </React.Fragment>
        );
    }
}

export default ContentBookManagement;