import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { REQUEST_URL } from './dbhelper/constants';
import { handleGetPromise,handlePostJson } from './dbhelper/methods';
import Loading from './Loading.js';
import MyBorrowsBlock from './atoms/myBorrowsBlocks';

class ContentShowMyBorrows extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            borrows:[],
            hasResult:false,
        }
    }

    componentDidMount(){
        var getMyBorrows = handleGetPromise(REQUEST_URL+`/borrow`);
        getMyBorrows.then((response)=>{
            if(response.response.length>0){
                console.log(response.response)
                response.response.map((borrow)=>{
                    this.setState(prveState=>({
                        borrows:[...prveState.borrows, borrow],
                    }));
                })
                this.setState({
                    isLoading:false,
                    hasResult:true,
                })
            }else{//no borrows
                this.setState({
                    isLoading:false,
                });
            }
        });

    }

    render(){
        if(this.state.isLoading){
            return (<Loading />)
        }else{
            if(this.state.hasResult){
                return (
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book name:</th>
                                <th>Author:</th>
                                <th>ISBN:</th>
                                <th>Borrowed on:</th>
                                <th>Should return by:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.borrows.map((data,index)=>{
                                return(<MyBorrowsBlock borrow={data} key={index}/>);
                            })}
                        </tbody>
                    </Table>

                )
            }else{
                return(<p>no result</p>);
            }
        }
    }
}

export default ContentShowMyBorrows;