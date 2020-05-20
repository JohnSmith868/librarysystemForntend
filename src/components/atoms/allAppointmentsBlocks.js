import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { REQUEST_URL } from '../dbhelper/constants';
import { handlePutJSON } from '../dbhelper/methods';
import Loading from '../Loading.js';

class AllAppointmentsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: props.appointment,
            message:"confirming....",
            showModal:false,
            status: props.appointment.status,
        }
    }

    handleConfirm(){
        
        
        this.setState({
            showModal:true,
        });
        var confirmBorrow = handlePutJSON(REQUEST_URL+`/appointments/confirm/${this.state.appointment.apointid}`);
        confirmBorrow.then((data)=>{
            if(data.succeed){
                this.setState({
                    message:"succeed confirm this appointment, book status changed to borrowed.",
                    status:"collected",
                });
            }else{
                this.setState({
                    message:"something error, please try again."
                });
            }
        });
    }

    onClickconfirmOk(){
        this.setState({
            showModal:false,
        })
    }
    renderAction(){
        if(this.state.status!="collected"){
            return(
                <Button variant="primary" onClick={this.handleConfirm.bind(this)}>Confirm</Button>
            );
        }else{
            return(
                <Button variant="link">collected</Button>
            )
        }
        
    }
    render() {
        const { appointment } = this.state;
        
        //start date format
        var startdatearr = appointment.apointdate.split("T");
        var startdatearryymmdd = startdatearr[0].split("-");
        let startdate = new Date(startdatearryymmdd[0],parseInt(startdatearryymmdd[1])-1,startdatearryymmdd[2]);
        startdate.setDate(startdate.getDate()+1);
        let startdatestr = startdate.getFullYear()+"-"+(startdate.getMonth()+1) +"-"+ startdate.getDate();
        //deadline format
        var enddatearr = appointment.deadline.split("T");
        var enddatearryymmdd = enddatearr[0].split("-");
        let enddate = new Date(enddatearryymmdd[0],parseInt(enddatearryymmdd[1])-1,enddatearryymmdd[2]);
        enddate.setDate(enddate.getDate()+1);
        let enddatestr = enddate.getFullYear()+"-"+(enddate.getMonth()+1) +"-"+ enddate.getDate();
        
        return (
            <React.Fragment>
                <tr>
                <td>{appointment.apointid}</td>
                <td>{appointment.bookname}</td>
                <td>{appointment.normaluserid}</td>
                <td>{startdatestr}</td>
                <td>{enddatestr}</td>
                <td>{this.renderAction()}</td>
                </tr>
            
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

export default AllAppointmentsBlock;