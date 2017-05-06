import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { selectContestType } from '../../actions/index';
import { IAction, IReduxState } from '../../constants/interfaces';
import Argument from '../../models/argument';
import Contest from '../../models/contest';
import ParameterInput from './parameter_input';
import StrategyContainer from './strategy_container';
import Submit from './submit/submit';

export interface IInterfaceProps extends RouteComponentProps<any> {
  contest?: Contest;
  selectContestType?: (name: string) => IAction;
}

export interface IInterfaceState {
  [key: string]: string;
}

class Interface extends React.Component<IInterfaceProps, IInterfaceState> {

  constructor(props: IInterfaceProps) {
    super(props);
    this.state = {
      ...this.initializeParameters(props.contest.params),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidMount() {
    const contestType = this.props.match.params.contest;
    this.props.selectContestType(contestType);
  }

  public handleChange({ currentTarget }: React.FormEvent<HTMLInputElement>): void {
    this.setState({ [currentTarget.name]: currentTarget.value });
  }

  public initializeParameters(params: Argument[]): {} {
    return params.reduce((state: any, param) => {
      state[param.parameter] = param.value;
      return state;
    }, {});
  }

  public render(): JSX.Element {
    const { contest } = this.props;
    if (!contest) {
      return <div className="interface__container" />;
    }
    return (
      <div className="interface__container" >
        <div className="content__description">
          <h4>{contest.description}</h4>
        </div>
        <div className="interface__inner-container">
          <StrategyContainer />
          <h3>{contest.name} Parameters:</h3>
          <div className="interface__contest-params">
            {contest.params.map((param, i) => (
              <ParameterInput
                key={i}
                param={param}
                handleChange={this.handleChange}
                value={this.state[param.parameter]}
              />
            ))}
          </div>
          <Submit activeContest={contest} params={this.state} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IReduxState, ownProps: any): {} {
  const contestType = ownProps.match.params.contest;
  return {
    contest: state.contest.contests.find((t) => (
      t.name.toLowerCase() === contestType
    )),
  };
}

const InterfaceContainer = connect<{}, {}, IInterfaceProps>(mapStateToProps,{
  selectContestType,
})(Interface);

export default InterfaceContainer;
