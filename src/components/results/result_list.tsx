import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { selectContestType } from '../../actions/index';
import { IAction, IReduxState, IResultsReducer } from '../../constants/interfaces';
import Contest from '../../models/contest';
import Result from '../../models/result';
import ResultItem from './result_list_row';

// tslint:disable-next-line:no-var-requires
const uuidV4 = require('uuid/v4');

export interface IContestListProps extends RouteComponentProps<any> {
  contests?: Contest[];
  selectContestType?: (name: string) => IAction;
  previousContests: Result[];
}

class ContestList extends React.Component<IContestListProps, {}> {

  public componentDidMount() {
    this.props.selectContestType(undefined);
  }

  public render(): JSX.Element {
    const { previousContests } = this.props;
    return (
      <div className="result_list__container">
        <div className="content__description">
          <h4>List of past contests that have been played</h4>
        </div>
        <div className="result_list__table">
          <div className="result_list__row result_list__header">
            <div className="result_list__contest result_list__column">
              Type
            </div>
            <div className="result_list__players result_list__column">
              # Players
            </div>
            <div className="result_list__winner result_list__column">
              Winner
            </div>
            <div className="result_list__pareto result_list__column">
              Scores
            </div>
            <div className="result_list__date result_list__column">
              Date
            </div>
          </div>
          {previousContests.slice(0, 50).map((contest, i) => (
            <ResultItem key={uuidV4()} result={contest} />
          ))}
          </div>
      </div>
    );
  }
}

function combineFinishedContests({ matches,
                                   moranProcesses,
                                   tournaments }: IResultsReducer): Result[] {

  const allContests = matches.concat(moranProcesses).concat(tournaments);
  const sortedContests = allContests.sort((a, b) => a.created < b.created ? 1 : -1);
  return sortedContests;
}

function mapStateToProps(state: IReduxState): {} {
  return {
    previousContests: combineFinishedContests(state.results),
  };
}

export default connect<{}, {}, IContestListProps>(mapStateToProps, {
  selectContestType,
})(ContestList);
