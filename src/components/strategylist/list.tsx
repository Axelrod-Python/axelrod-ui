import * as React from 'react';
import * as Infinite from 'react-infinite';
import { presets, spring, TransitionMotion } from 'react-motion';
import { connect } from 'react-redux';

import { selectContestType } from '../../actions/index';
import { IAction, IFilterList, IReduxState } from '../../constants/interfaces';
import Strategy from '../../models/strategy';
import StrategyFilter from './filter/filter';
import FilterPanel from './filter/panel';
import StrategyInfo from './info/info';
import StrategyListItem from './list_item';

export interface IStrategyListProps {
  strategies?: Strategy[];
  filters?: IFilterList;
}

export interface IStrategyListState {
  activeStrategy: Strategy;
  activeX: number;
  activeY: number;
  containerHeight: number;
  filterValue: string;
  filterX: number;
  filterY: number;
  showFilter: boolean;
}

class StrategyList extends React.Component<IStrategyListProps, IStrategyListState> {

  constructor(props: IStrategyListProps) {
    super(props);
    this.state = {
      activeStrategy: undefined,
      activeX: undefined,
      activeY: undefined,
      containerHeight: undefined,
      filterValue: '',
      filterX: undefined,
      filterY: undefined,
      showFilter: false,
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filterStrategies = this.filterStrategies.bind(this);
    this.setActiveStrategy = this.setActiveStrategy.bind(this);
    this.closeActiveStrategy = this.closeActiveStrategy.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  public componentDidMount(): void {
    this.handleResize();
    window.onresize = () => this.handleResize();
  }

  public handleResize() {
    const containerHeight = window.innerHeight - 48;
    this.setState({ containerHeight });
  }

  public handleFilterChange({ currentTarget }: React.FormEvent<HTMLInputElement>): void {
    this.setState({ filterValue: currentTarget.value });
  }

  public filterBoolean(strategies: Strategy[], name: string, boolValue: boolean) {
    if (boolValue !== undefined) {
      return strategies.filter((s) => s.classifier[name] === boolValue);
    }
    return strategies;
  }

  public filterStrategies(strategies: Strategy[]): Strategy[] {
    const { filters } = this.props;
    return strategies.filter((s) => s.matchesAllFilters(filters));
  }

  public findStrategyByName(name: string): Strategy {
    const { strategies } = this.props;
    const nameLower = name.toLowerCase();
    return strategies.find((strategy) => strategy.name.toLowerCase() === nameLower);
  }

  public setActiveStrategy(name: string, activeX: number, activeY: number): void {
    const { activeStrategy } = this.state;
    if (activeStrategy && activeStrategy.name === name) {
      this.closeActiveStrategy();
    } else {
      this.setState({
        activeStrategy: this.findStrategyByName(name),
        activeX,
        activeY
      });
    }
  }

  public closeActiveStrategy(): void {
    this.setState({ activeStrategy: undefined });
  }

  public toggleFilter(x: number, y: number): void {
    if (this.state.showFilter) {
      this.setState({
        filterX: undefined,
        filterY: undefined,
        showFilter: false,
      });
    } else {
      this.setState({
        filterX: x,
        filterY: y,
        showFilter: true,
      });
    }
  }

  public willEnter(): any {
    return {
      border: 0,
      boxShadow: 0,
      height: 15,
      margin: 0,
      opacity: 0,
      padding: 0,
    };
  }

  public willLeave(): any {
    return {
      border: 0,
      boxShadow: 0,
      height: 0,
      margin: 0,
      opacity: 0,
      padding: 0,
    };
  }

  public getDefaultStyles = () => {
    return this.props.strategies.map((strategy) => (
      {
        data: strategy,
        key: strategy.id,
        style: {
          height: spring(35, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      }
    ));
  }

  public getStyles = () => {
    const { strategies } = this.props;
    return this.filterStrategies(strategies).map((strategy) => {
      return {
        data: strategy,
        key: strategy.id,
        style: {
          height: spring(35, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      };
    });
  }

  public renderInfinite(strategies: any): JSX.Element {
    const { activeStrategy } = this.state;
    return (
      <Infinite
        className="strategy_list__infinite"
        containerHeight={this.state.containerHeight || '100px'}
        elementHeight={41}
      >
        {strategies.map(({ key, style, data }: any) =>
          // tslint:disable-next-line:jsx-wrap-multiline
          <StrategyListItem
            key={key}
            strategy={data}
            setActiveInfo={this.setActiveStrategy}
            style={style}
            active={data.name === activeStrategy}
          />
        )}
      </Infinite>
    );
  }

  public render(): JSX.Element {
    const { activeStrategy, activeX, activeY, filterValue,
    showFilter, filterX, filterY } = this.state;
    return (
      <div className="strategy_list__outer-container">
        {activeStrategy ?
          // tslint:disable-next-line:jsx-wrap-multiline
          <StrategyInfo
            closeActiveStrategy={this.closeActiveStrategy}
            strategy={activeStrategy}
            x={activeX}
            y={activeY}
          /> : undefined}
        {showFilter ? <FilterPanel x={filterX} y={filterY} /> : undefined}
        <div className="strategy_list__container" >
          <StrategyFilter toggleFilter={this.toggleFilter} />
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {(strategies: any) => {
              return this.renderInfinite(strategies);
            }}
          </TransitionMotion>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IReduxState): {} {
  return {
    filters: state.strategy.filters,
    strategies: state.strategy.strategies,
  };
}

const StrategyListContainer = connect<{}, {}, IStrategyListProps>(mapStateToProps, {
})(StrategyList);

export default StrategyListContainer;
