
import * as axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';

import { clearInterfaceStrategies, fetchTournaments,
  storeContestResults } from '../../../actions';
import { IAction, IReduxState } from '../../../constants/interfaces';
import { API } from '../../../constants/types';
import Contest from '../../../models/contest';
import Strategy from '../../../models/strategy';
import Errors from './errors';
import ShowResults from './submit_results';
import Warning from './warning';

export interface ISubmitProps {
  clearInterfaceStrategies?: () => IAction;
  fetchTournaments?: () => IAction;
  strategies?: Strategy[];
  storeContestResults?: (results: any) => IAction;
  activeContest: Contest;
  params: {};
}

export interface ISubmitState {
  [key: string]: any;
  errors: string[];
  success: string;
  loading: boolean;
}

interface IMeetsRequirements {
  meetsRequirements: boolean;
  message: string;
}

class Submit extends React.Component<ISubmitProps, ISubmitState> {

  private defaultState: ISubmitState;

  constructor(props: ISubmitProps) {
    super(props);
    this.defaultState = {
      errors: undefined,
      loading: false,
      success: undefined,
    };
    this.state = this.defaultState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  public componentWillUpdate(nextProps: ISubmitProps) {
    if (nextProps.strategies.length !== this.props.strategies.length) {
      this.setState(this.defaultState);
    }
  }

  public getEndpoint(type: string): string {
    switch (type) {
      case 'Match':
        return 'matches';
      case 'Tournament':
        return 'tournaments';
      case 'Moran Process':
        return 'moran';
      default:
        return '';
    }
  }

  public formatKey(key: string): string {
    return key.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  public handleSubmit(): void {
    const { strategies, activeContest, params } = this.props;
    // tslint:disable-next-line:variable-name
    const player_list = strategies.map((strategy) => strategy.id);
    const postData = {
      ...params,
      player_list,
    };
    const endpoint = this.getEndpoint(activeContest.name);
    this.setState({ loading: true });
    axios.post(`${API}/${endpoint}/`, postData)
    .then((res: any) => {
      this.setState({
        errors: undefined,
        loading: false,
        success: `/results/${endpoint}/${res.data.id}/`,
      });
    })
    .then(() => this.props.fetchTournaments())
    .catch((err: any) => {
      if (err.response.status === 400) {
        const errorObject = err.response.data;
        const keys = Object.keys(errorObject);
        const errors = keys.map((key) => `${this.formatKey(key)}: ${errorObject[key]}`);
        this.setState({
          errors,
          loading: false,
          success: undefined,
        });
      }
    });
  }

  public handleCancel(): void {
    this.setState(this.defaultState, () => {
      this.props.clearInterfaceStrategies();
    });
  }

  public checkMeetsRequirements(): IMeetsRequirements {
    const { strategies, activeContest } = this.props;

    const { minPlayers, maxPlayers } = activeContest;
    const plural = minPlayers === 1 ? '' : 's';
    if (maxPlayers > -1 && strategies.length > maxPlayers) {
      const message = `You can only use ${maxPlayers} player${plural} for this contest type`;
      return { meetsRequirements: false, message };
    } else if (strategies.length < minPlayers) {
      const message = `You must choose at least ${minPlayers} player${plural} for this contest type`;
      return { meetsRequirements: false, message };
    }
    return { meetsRequirements: true, message: '' };
  }

  public render(): JSX.Element {
    const { errors, success } = this.state;
    const { activeContest } = this.props;
    const { meetsRequirements, message } = this.checkMeetsRequirements();
    if (!meetsRequirements) {
      return <Warning message={message} />;
    }

    return (
      <div className="submit__container" >
        <div className="submit__error-container">
          {errors ? <Errors errors={errors} /> : undefined}
        </div>
        <div className="submit__success-container">
          {success ? <ShowResults contest={activeContest.name} target={success} /> : undefined}
        </div>
        <button onClick={this.handleSubmit} >Submit</button>
        <button onClick={this.handleCancel} >Cancel</button>
      </div>
    );
  }
}

function mapStateToProps(state: IReduxState): {} {
  return {
    strategies: state.interface.strategies,
  };
}

const SubmitContainer = connect<{}, {}, ISubmitProps>(mapStateToProps, {
  clearInterfaceStrategies,
  storeContestResults,
  fetchTournaments,
})(Submit);

export default SubmitContainer;
