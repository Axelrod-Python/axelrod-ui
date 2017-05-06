
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchMatches, fetchMoranProcesses, fetchStrategies,
  fetchTournaments } from '../actions/index';
import { IAction } from '../constants/interfaces';
import Main from './main';
import Navbar from './navbar';

export interface IApplicationProps {
  fetchStrategies?: () => IAction;
  fetchMatches?: () => IAction;
  fetchMoranProcesses?: () => IAction;
  fetchTournaments?: () => IAction;
  fetchContests?: () => IAction;
}

class Application extends React.Component<IApplicationProps, {}> {

  public componentDidMount() {
    this.props.fetchMatches();
    this.props.fetchMoranProcesses();
    this.props.fetchStrategies();
    this.props.fetchTournaments();
  }

  public render() {
    return (
      <div className="application-container">
        <Navbar />
        <Main />
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
  };
}

export default withRouter(connect<{}, {}, any> (mapStateToProps, {
  fetchMatches,
  fetchMoranProcesses,
  fetchStrategies,
  fetchTournaments,
})(Application));