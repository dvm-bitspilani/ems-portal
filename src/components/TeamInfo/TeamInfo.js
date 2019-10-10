import React from "react";
import { connect } from "react-redux";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
  // makeStyles
} from "@material-ui/core";
import Spinner from "../Spinner/Spinner";

// const useStyles = makeStyles(theme => ({
//   tableContainer: {
//     width: "100%",
//     overflowX: "scroll"
//   },
//   table: {
//     minWidth: 500,
//   },
// }));

const classes = {
  tableContainer: {
    width: "100%",
    overflowX: "scroll"
  },
  table: {
    minWidth: 500
  }
};

const createTeamRows = (name, college, emsCode) => {
  return { name, college, emsCode };
};

// const teamRows = [
//   createTeamRows("Participant-1", "BITS Pilani", "W23@12"),
//   createTeamRows("Participant-1", "BITS Pilani", "W23@12"),
//   createTeamRows("Participant-1", "BITS Pilani", "W23@12"),
//   createTeamRows("Participant-1", "BITS Pilani", "W23@12"),
// ]

const createScoreRows = (level, score) => {
  return { level, score };
};

// const scoreRows = [
//   createScoreRows("Level1", "23"),
//   createScoreRows("Level2", "46"),
// ]

class TeamInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }

  // UNSAFE_componentWillMount() {
  //   const TeamInformation =
  //     this.props.teamInfo !== undefined ? <div>Info not loaded</div> : null;
  // }

  render() {
    console.log(this.props);
    let teamRows = [];
    let scoreRows = [];

    let team_info = [];
    let participants = [];
    let levels_info = [];

    if (this.props.teamInfo !== undefined) {
      // { team_info, participants, levels_info } = this.props.teamInfo;
      team_info = this.props.teamInfo.team_info;
      participants = this.props.teamInfo.participants;
      levels_info = this.props.teamInfo.levels_info;

      teamRows = participants.map(person =>
        createTeamRows(person.name, person.college, person.code)
      );

      scoreRows = levels_info.map(level =>
        createScoreRows(level.name, level.score)
      );
    }

    /* ---------------- Structure of response objects --------------------
    team_info: {
      id,
      name,
      code
    }
    participants: [
      {
        name,
        college,
        code
      }
      ...
      ...
    ]
    levels_info: [
      {
        name,
        level_inst_id,
        score
      }
    ]
    --------------------------------------------------------------------*/

    return (
      <div>
        {this.props.teamInfo === undefined ? (
          <Spinner />
        ) : (
          <div>
            <Typography variant="h4">{team_info.name}</Typography>
            <Typography variant="caption">{`ID:${team_info.id} | Code:${team_info.code}`}</Typography>
            <Typography variant="h4">Participants: </Typography>

            <div className={classes.tableContainer}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Phone</TableCell>
                    <TableCell align="left">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamRows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.college}</TableCell>
                      <TableCell align="left">{row.emsCode}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Typography variant="h4">Scores:</Typography>
            <div className={classes.tableContainer}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Level</TableCell>
                    <TableCell align="left">Total Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scoreRows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.level}
                      </TableCell>
                      <TableCell align="left">{row.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// const TeamInfo = props => {
//   console.log(this.props);
//     let teamRows = [];
//     let scoreRows = [];

//     let team_info = [];
//     let participants = [];
//     let levels_info = [];

//     if (this.props.teamInfo !== undefined) {
//       // { team_info, participants, levels_info } = this.props.teamInfo;
//       team_info = this.props.teamInfo.team_info;
//       participants = this.props.teamInfo.participants;
//       levels_info = this.props.teamInfo.levels_info;

//       teamRows = participants.map(person =>
//         createTeamRows(person.name, person.college, person.code)
//       );

//       scoreRows = levels_info.map(level =>
//         createScoreRows(level.name, level.score)
//       );
//     }

//     return (
//       <div>
//         {this.props.teamInfo === undefined ? (
//           <Spinner />
//         ) : (
//           <div>
//             <Typography variant="h4">{team_info.name}</Typography>
//             <Typography variant="caption">{`ID:${team_info.id} | Code:${team_info.code}`}</Typography>
//             <Typography variant="h4">Participants: </Typography>

//             <div className={classes.tableContainer}>
//               <Table className={classes.table}>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="left">Name</TableCell>
//                     <TableCell align="left">Phone</TableCell>
//                     <TableCell align="left">Email</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {teamRows.map((row, index) => (
//                     <TableRow key={index}>
//                       <TableCell component="th" scope="row">
//                         {row.name}
//                       </TableCell>
//                       <TableCell align="left">{row.college}</TableCell>
//                       <TableCell align="left">{row.emsCode}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>

//             <Typography variant="h4">Scores:</Typography>
//             <div className={classes.tableContainer}>
//               <Table className={classes.table}>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="left">Level</TableCell>
//                     <TableCell align="left">Total Score</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {scoreRows.map((row, index) => (
//                     <TableRow key={index}>
//                       <TableCell component="th" scope="row">
//                         {row.level}
//                       </TableCell>
//                       <TableCell align="left">{row.score}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </div>
//         )}
//       </div>
//     );
// };

const mapStateToProps = state => {
  return {
    teamInfo: state.teams.teamInfo
  };
};

export default connect(mapStateToProps)(TeamInfo);
