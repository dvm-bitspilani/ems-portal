import React from "react";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/actionTypes";
class Level extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            eventName : "Rap Wars 2",
            level: 2
        }
    }
    componentWillMount(){
        this.setState({
            eventName: this.props.eventName,
            level: this.props.level
        })
    }
    render(){
        return( 
            <div>
                level {" "+this.state.eventName+" "+this.state.level}
            </div>
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
     eventName: (eventName) => dispatch(actions.UPDATE_LEVEL(eventName)),
     level: (level) => dispatch(actions.UPDATE_LEVEL(level))
    };
};
  
  export default connect(
   mapStateToProps, null
  )(Level);
