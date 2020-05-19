import React from "react";
import { Form, Button, Table } from 'react-bootstrap';
import { REQUEST_URL } from './dbhelper/constants';
import { handleGetPromise } from './dbhelper/methods';
import Loading from './Loading'
import SearchResultsBlocaks from './atoms/searchResultsBlocks';
import "../css/contentBorder.css";

class ContentSearchbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            bookname: '',
            isSearch:false,
            result: [],//bookid inside,
            noresult:false,
        }
    }

    handleSearch() {
        this.setState({
            isLoading: true,
            result:[],
        });
        var searchBook = handleGetPromise(REQUEST_URL + `/books?keyword=${this.state.bookname}`);

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

    handleOnchangeKeyword(e) {
        this.setState({
            bookname: e.target.value,
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
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.result.map((data, index) => {
                                return (<SearchResultsBlocaks bookid={data} key={index}/>)
                            })}
                        </tbody>
                    </Table>
                </React.Fragment>
            );
        }else if(this.state.noresult){
            return <p>no result found. sorry.</p>
        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="contentBorder">
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
                </div>
                <div>

                </div>
            </React.Fragment>
        );
    }
}

export default ContentSearchbook;