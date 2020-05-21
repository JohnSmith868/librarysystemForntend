import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { REQUEST_URL } from '../dbhelper/constants';
import { handleDeleteJSON } from '../dbhelper/methods';
import Loading from '../Loading.js';

class MyBorrowsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            borrow: props.borrow,
            
        }
    }

    

    render() {
        const { borrow } = this.state;
        
        //start date format
        var startdatearr = borrow.borrowdate.split("T");
        var startdatearryymmdd = startdatearr[0].split("-");
        let startdate = new Date(startdatearryymmdd[0],parseInt(startdatearryymmdd[1])-1,startdatearryymmdd[2]);
        startdate.setDate(startdate.getDate()+1);
        let startdatestr = startdate.getFullYear()+"-"+(startdate.getMonth()+1) +"-"+ startdate.getDate();
        //deadline format
        var enddatearr = borrow.returndate.split("T");
        var enddatearryymmdd = enddatearr[0].split("-");
        let enddate = new Date(enddatearryymmdd[0],parseInt(enddatearryymmdd[1])-1,enddatearryymmdd[2]);
        enddate.setDate(enddate.getDate()+1);
        let enddatestr = enddate.getFullYear()+"-"+(enddate.getMonth()+1) +"-"+ enddate.getDate();
        
        return (
            <React.Fragment>
                <tr>
                <td>{borrow.borrowid}</td>
                <td>{borrow.bookname}</td>
                <td>{borrow.author}</td>
                <td>{borrow.ISBN}</td>
                <td>{startdatestr}</td>
                <td>{enddatestr}</td>
                
                </tr>

            </React.Fragment>
        );
    }
}

export default MyBorrowsBlock;