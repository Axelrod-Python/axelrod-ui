import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IReduxState } from '../../constants/interfaces';
import HeatMap from '../../d3/heat_map';
import Pareto from '../../d3/pareto';
import Violin from '../../d3/violin_chart';
import Result from '../../models/result';
import Strategy from '../../models/strategy';
import Loader from '../loader';
import DefinitionInfo from './definition_info';
import NotImplemented from './not_implemented';
import Panel from './result_panel';

export interface IResultsProps extends RouteComponentProps<any> {
  notImplemented?: boolean;
  result: Result;
  strategies: Strategy[];
  type: string;
}

class Results extends React.Component<IResultsProps, {}> {

  public render(): JSX.Element {
    const { result, notImplemented, type } = this.props;
    if (notImplemented) {
      return <NotImplemented type={type} />;
    }
    if (!result) {
      return <div className="results__loader"><Loader /></div>;
    }
    return (
      <div className="results__container" >
        <div className="content__description">
          <h4>
            {result.contestType} Winner: {result.winner}
          </h4>
        </div>
        <div className="results__info-container">
          <Panel label="definition" active={true} >
            <DefinitionInfo definition={result.definition} type={result.contestType} />
          </Panel>
          <Panel label="players" active={true} >
            <div className="results__players">
              {result.definition.playerList.map((player, i) => (
                <div key={i} >{this.getStrategyFromId(player).name}</div>
              ))}
            </div>
          </Panel>
        </div>
        <div className="results__charts">
          <Panel label="score results" active={true} >
            <Violin data={result.generateScoreViolin()} bandwidth={40 / 1000} clamp={1} />
          </Panel>
          <Panel label="win results" active={true} >
            <Violin data={result.generateWinViolin()} bandwidth={3} clamp={1} />
          </Panel>
          <Panel label="payoff results" active={true} >
            <HeatMap {...result.generatePayoff()} />
          </Panel>
          <Panel label="payoff mean difference" active={true} >
            <HeatMap {...result.generatePayoffDifference()} />
          </Panel>
        </div>
      </div>
    );
  }

  private getStrategyFromId(id: string): Strategy {
    const { strategies } = this.props;
    return strategies.find((s) => s.id === id);
  }
}

function mapStateToProps(state: IReduxState, ownProps: RouteComponentProps<any>): {} {
  const implementedTypes = ['tournaments'];
  const { type, id } = ownProps.match.params;
  if (implementedTypes.indexOf(type) === -1) {
    return { notImplemented: true, type };
  }

  if (state.results[type].length === 0) {
    return { result: undefined };
  }
  return {
    result: state.results[type].find((result) => result.id === parseInt(id, 10)),
    strategies: state.strategy.strategies,
  };
}

const ResultsContainer = connect<{}, {}, IResultsProps>(mapStateToProps,
  {})(Results);

export default ResultsContainer;
