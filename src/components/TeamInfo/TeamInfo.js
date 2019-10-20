import React from "react";
import { connect } from "react-redux";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Paper
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Spinner from "../Spinner/Spinner";

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

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: grey[200],
    height: "calc(100vh - 90px)",
    padding: theme.spacing(2)
    // paddingTop: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  tableContainer: {
    width: "100%",
    overflowX: "scroll"
  },
  table: {
    minWidth: 500
  }
}));

const createTeamRows = (name, college, emsCode) => {
  return { name, college, emsCode };
};

const createScoreRows = (level, score) => {
  return { level, score };
};

const TeamInfo = props => {
  const classes = useStyles();

  let teamRows = [];
  let scoreRows = [];

  let team_info = [];
  let participants = [];
  let levels_info = [];

  if (props.teamInfo !== undefined) {
    // { team_info, participants, levels_info } = props.teamInfo;
    team_info = props.teamInfo.team_info;
    participants = props.teamInfo.participants;
    levels_info = props.teamInfo.levels_info;

    teamRows = participants.map(person =>
      createTeamRows(person.name, person.college, person.code)
    );

    scoreRows = levels_info.map(level =>
      createScoreRows(level.name, level.score)
    );
  }

  return (
    <div>
      {props.teamInfo === undefined ? (
        <Spinner />
      ) : (
        <div className={classes.container}>
          <Paper className={classes.paper}>
            <Typography variant="h4">{team_info.name}</Typography>
            <Typography variant="caption">{`ID:${team_info.id} | Code:${team_info.code}`}</Typography>
            <Typography variant="h6" style={{ marginTop: "30px" }}>
              Participants:{" "}
            </Typography>

            <div className={classes.tableContainer}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">College</TableCell>
                    <TableCell align="left">Participant Code</TableCell>
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

            <Typography variant="h6" style={{ marginTop: "30px" }}>
              Scores:
            </Typography>
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
          </Paper>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    teamInfo: state.teams.teamInfo
  };
};

export default connect(mapStateToProps)(TeamInfo);
