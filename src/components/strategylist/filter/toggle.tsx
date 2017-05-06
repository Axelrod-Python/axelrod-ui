import * as React from 'react';

export interface IStrategyFilterToggleProps {
  toggleClick: (x: number, y: number) => void;
}

class StrategyFilterToggle extends React.Component<IStrategyFilterToggleProps, {}> {

  constructor(props: IStrategyFilterToggleProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick(event: React.MouseEvent<HTMLDivElement>): void {
    const x: number = event.clientX;
    const y: number = event.clientY;
    this.props.toggleClick(x, y);
  }

  public render(): JSX.Element {
    return (
      <div
        className="strategy_filter__filters-container"
        onClick={this.handleClick}
      >
        <i className="material-icons strategy_filter__toggle">filter_list</i>
      </div>
    );
  }
}

export default StrategyFilterToggle;
