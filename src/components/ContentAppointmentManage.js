import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { REQUEST_URL } from './dbhelper/constants';
import { handleGetPromise,handlePostJson } from './dbhelper/methods';
import Loading from './Loading.js';
import AllAppointmentsBlock from './atoms/allAppointmentsBlocks';

class ContentAppointmentManager extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            appointments:[],
            hasResult:false,
        }
    }

    componentDidMount(){
        var getAllAppointments = handleGetPromise(REQUEST_URL+`/appointments`);
        getAllAppointments.then((data)=>{
            if(data.response.length>0){
                data.response.map((appointment)=>{
                    this.setState(prveState=>({
                        appointments:[...prveState.appointments, appointment],
                    }));
                });
                this.setState({
                    isLoading:false,
                    hasResult:true,
                })
                
            }else{
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
                                <th>Student id:</th>
                                <th>Appointed from:</th>
                                <th>Final Collect Date:</th>
                                <th>Action:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.appointments.map((data,index)=>{
                                return(<AllAppointmentsBlock appointment={data} key={index}/>);
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

export default ContentAppointmentManager;