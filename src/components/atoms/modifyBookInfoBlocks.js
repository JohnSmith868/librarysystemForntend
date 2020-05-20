import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { REQUEST_URL } from '../dbhelper/constants';
import { handleGetPromise,handlePutJSON, handleDeleteJSON } from '../dbhelper/methods';
import Loading from '../Loading.js';

class ModifyBookInfoBlock extends React.Component {
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

    handleOnchangeName(e){
        this.setState({
            bookname:e.target.value
        });
    }

    handleOnchangAuthor(e){
        this.setState({
            bookauthor:e.target.value
        });
    }
    
    handleOnchangeISBN(e){
        this.setState({
            bookisbn:e.target.value
        });
    }
    handleModifyBook(){
        const postdata={
            bookname:this.state.bookname,
            author:this.state.bookauthor,
            isbn:this.state.bookisbn,
        }
        this.setState({
            showModal:true,
        });
        
        var modifyBookInfo = handlePutJSON(REQUEST_URL+`/managebooks/${this.state.bookid}`,postdata);
        modifyBookInfo.then((data)=>{
            if(data.succeed){
                this.setState({
                    message:"modify succeed.",
                })
            }else{
                this.setState({
                    message:"Something error.",
                })
            }
        });

    }

    handleDeleteBook(){
        this.setState({
            showModal:true,
        });
        var deleteBook = handleDeleteJSON(REQUEST_URL+`/managebooks/${this.state.bookid}`);
        deleteBook.then((data)=>{
            if(data.succeed){
                this.setState({
                    message:"delete book succeed.",
                });
                
            }else{
                this.setState({
                    message:"Something error.",
                })
            }
        });
    }

    renderButtonForStatus() {
        
            return (
            <React.Fragment>
            <Button variant="primary" onClick={this.handleModifyBook.bind(this)}>Modify</Button>
            <Button variant="danger" onClick={this.handleDeleteBook.bind(this)}>Delete</Button>
            </React.Fragment>
            );
        
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
                            <Button variant="danger" onClick={this.onClickconfirmOk.bind(this)}>{"ok"}</Button>
                        </Modal.Footer>
                    </Modal>
                    <tr>
                        <td>{this.state.bookid}</td>
                        <td>
                            <Form.Group>
                                <Form.Control type="text" onChange={this.handleOnchangeName.bind(this)} value={this.state.bookname}></Form.Control>
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group>
                                <Form.Control type="text" onChange={this.handleOnchangAuthor.bind(this)} value={this.state.bookauthor}></Form.Control>
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group>
                                <Form.Control type="number" onChange={this.handleOnchangeISBN.bind(this)} value={this.state.bookisbn}></Form.Control>
                            </Form.Group>
                        </td>
                        <td>{this.renderButtonForStatus()}</td>
                    </tr>
                </React.Fragment>
            )
        }
    }

}

export default ModifyBookInfoBlock;