import React from "react";
import {
  ListItem,
  ListItemText
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/level";


class Links extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      eventName : this.props.eventName,
      levelName: this.props.levelName
    }
    this.updateLevel = this.updateLevel.bind(this);
  }
  updateLevel=()=>{
    this.props.levelUpdate(this.state.eventName,this.state.levelName);
  }
  render(){
    const style = {
      listItem: {
        width: "100%",
      },
      link: {
       textDecoration: "none",
       color: "black"
      }
    };
    return(
      <Link to={"/dashboard/"+this.state.eventName+"/level/" + this.state.levelName} style={style.link} onClick={this.updateLevel}>
      <ListItem button style={style.listItem}>
        <ListItemText primary= {"Level " +this.state.levelName}/>
      </ListItem>   
      </Link>
    )
  }
}

const mapStateToProps = state => {
  return {
    eventName: state.level.eventName,
    level: state.level.level
  };
};

const mapDispatchToProps = dispatch => {
  return {
   levelUpdate: (eventName,level) => dispatch(actions.updateLevel(eventName,level)),
  };
};

export default connect(
  null, mapDispatchToProps
)(Links);