import React from "react";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/level";
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
                {this.state.eventName+"\n"+this.state.level}
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
     levelUpdate: (eventName,level) => dispatch(actions.updateLevel(eventName,level)),
    };
};
  
export default connect(
    mapStateToProps, mapDispatchToProps
)(Level);
