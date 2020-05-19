import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { REQUEST_URL } from './dbhelper/constants';
import { handleGetPromise,handlePostJson } from './dbhelper/methods';
import Loading from './Loading.js';
import MyAppointmentBlock from './atoms/myAppointmentBlocks';

class ContentShowMyAppointment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            appintments:[],
            hasResult:false,
        }
    }

    componentDidMount(){
        var getMyAppointment = handleGetPromise(REQUEST_URL+`/userbooking`);
        getMyAppointment.then((response)=>{
            if(response.response.length>0){
                console.log(response.response)
                response.response.map((appointment)=>{
                    this.setState(prveState=>({
                        appintments:[...prveState.appintments, appointment],
                    }));
                })
                this.setState({
                    isLoading:false,
                    hasResult:true,
                })
            }else{//no appointments
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
                                <th>Appointed from:</th>
                                <th>Final Collect Date:</th>
                                <th>Action:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.appintments.map((data,index)=>{
                                return(<MyAppointmentBlock appointment={data} key={index}/>);
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

export default ContentShowMyAppointment;