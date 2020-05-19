import React from 'react';
class Loading extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      height: props.height || "",
      width: props.width || "",
    }
  }
  render(){
    var height = this.state.height
    var width = this.state.width
    return(
      <img style={{height:height,width:width}} src={process.env.PUBLIC_URL + "/images/loading.gif"} alt="loading"/>
    );
  }
}
export default Loading;
