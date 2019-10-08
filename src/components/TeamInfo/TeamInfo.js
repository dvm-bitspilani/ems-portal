import React from "react";
import { connect } from "react-redux";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  tableContainer: {
    width: "100%",
    overflowX: "scroll"
  },
  table: {
    minWidth: 500,
  },
}));

const createTeamRows = (name, college, emsCode) => {
  return {name, college, emsCode};
}

// const teamRows = [
//   createTeamRows("Participant-1", "BITS Pilani", "W23@12"),
//   createTeamRows("Participant-1", "BITS Pilani", "W23@12"),
//   createTeamRows("Participant-1", "BITS Pilani", "W23@12"),
//   createTeamRows("Participant-1", "BITS Pilani", "W23@12"),
// ]

const createScoreRows = (level, score) => {
  return {level, score};
}

// const scoreRows = [
//   createScoreRows("Level1", "23"),
//   createScoreRows("Level2", "46"),
// ]

// function TeamInfo(props) {
const TeamInfo = (props) => {
  console.log(props);
  const classes = useStyles();
  const {team_info, participants, levels_info} = {...props.teamInfo};
  console.log(team_info);

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
  let teamRows = [];
  let scoreRows = [];

  if (participants >= 1) {
    teamRows = participants.map(person => (
      createTeamRows(person.name, person.college, person.code)
    ));
  
    scoreRows = levels_info.map(level => (
      createScoreRows(level.name, level.score)
    ));
  }

  return (
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
            {teamRows.map((row,index) => (
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
            {scoreRows.map((row,index) => (
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
  );
}

const mapStateToProps = state => {
  return {
    teamInfo: state.teams.teamInfo
  }
}

export default connect(mapStateToProps)(TeamInfo);
