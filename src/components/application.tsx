
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchMatches, fetchMoranProcesses, fetchStrategies,
  fetchTournaments } from '../actions/index';
import { IAction } from '../constants/interfaces';
import Main from './main';
import Navbar from './navbar';
import StrategyList from './strategylist/list';

declare const window: any;

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
    this.props.fetchTournaments();
    this.props.fetchStrategies();

    // if (!window.__PRELOADED_STATE__) {
    //   this.props.fetchStrategies();
    // }

    // remove the application loader from the dom
    const loader = document.getElementById('app-loading');
    if (loader) {
      loader.remove();
    }
  }

  public render() {
    return (
      <div className="application-container">
        <StrategyList />
        <div className="main__container" >
          <Navbar />
          <Main />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
  };
}

// 

export default withRouter(connect<{}, {}, any> (mapStateToProps, {
  fetchMatches,
  fetchMoranProcesses,
  fetchStrategies,
  fetchTournaments,
})(Application));
