import * as React from 'react';

import Input from './input';
import FilterPanel from './panel';
import FilterToggle from './toggle';

export interface IStrategyFilterProps {
  toggleFilter: (x: number, y: number) => void;
}

export interface IStrategyFilterState {
  showFilterOptions: boolean;
  panelPositionX: number;
  panelPositionY: number;
}

class StrategyFilter extends React.Component<IStrategyFilterProps, IStrategyFilterState> {

  constructor(props: IStrategyFilterProps) {
    super(props);
    this.state = {
      panelPositionX: undefined,
      panelPositionY: undefined,
      showFilterOptions: false,
    };
    this.toggleFilterOptions = this.toggleFilterOptions.bind(this);
  }

  public toggleFilterOptions(x: number, y: number): void {
    this.setState({
      panelPositionX: x,
      panelPositionY: y,
      showFilterOptions: !this.state.showFilterOptions,
    });
  }

  public render(): JSX.Element {
    const { panelPositionX, panelPositionY, showFilterOptions } = this.state;
    return (
      <div className="strategy_filter__container" >
        <Input name="name" id="filter__name" placeholder="Filter Strategies" />
        <FilterToggle toggleClick={this.props.toggleFilter} />
      </div>
    );
  }
}

export default StrategyFilter;
