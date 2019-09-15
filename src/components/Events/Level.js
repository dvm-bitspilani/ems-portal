import React from "react";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/level";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

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
        const styles = {
            h1 : {
                "font-family": "Roboto, Helvetica, Arial, sans-serif"
            },
            button: {
                margin: "10px",
            },
            container:{
                overflow:"scroll",
                width:"100%",
                margin:"1vw auto",
                display:"flex",
            },
            link:{
                width:"140px"
            }
        }
        return( 
            <Container fixed>
            <h1 style={styles.h1}>Teams</h1>
            <div fixed style={styles.container}>
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button>
                    <ListItemText primary={"Team Name"} style={styles.link}/>
                    <ListItemText primary={"Total Score: 5"} style={styles.link}/>
                    <Button variant="contained" color="primary" style={styles.button}>
                        Update Score
                    </Button>
                    <Button variant="contained" color="secondary" style={styles.button}>
                        Freeze
                    </Button>
                    </ListItem>
                   
                </List>
            </div>
            </Container>
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
    mapStateToProps, mapDispatchToProps,null,{pure: false}
)(Level);
