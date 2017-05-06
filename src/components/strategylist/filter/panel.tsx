import * as React from 'react';

import Checkbox from './checkbox';
import Input from './input';

export interface IStrategyFilterPanelProps {
  x: number;
  y: number;
}

export interface IStrategyFilterPanelState {
  [key: string]: any;
  memoryDepth: string;
  minMemoryDepth: string;
  maxMemoryDepth: string;
}

class StrategyFilterPanel extends React.Component<IStrategyFilterPanelProps, IStrategyFilterPanelState> {

  public render(): JSX.Element {
    const style = { marginTop: this.props.y + 5, marginLeft: this.props.x + 5 };
    return (
      <div className="strategy_filter_panel__container" style={style}>
        <h4>Filter Options</h4>
        <Checkbox name="stochastic" label="Stochastic" />
        <Checkbox name="longRunTime" label="Long Run Time" />
        <Checkbox name="manipulatesState" label="Manipulates State" />
        <Checkbox name="manipulatesSource" label="Manipulates Source" />
        <Checkbox name="inspectsSource" label="Inspects Source" />
        <Input name="memoryDepth" label="Memory Depth" />
        <Input name="minMemoryDepth" label="Min Mem. Depth" />
        <Input name="maxMemoryDepth" label="Max Mem. Depth" />
        <Input name="makesUseOf" label="Makes Use Of" below={true} />
      </div>
    );
  }
}

export default StrategyFilterPanel;
