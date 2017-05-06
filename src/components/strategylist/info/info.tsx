import * as React from 'react';

import Strategy from '../../../models/strategy';
import StrategyInfoArgs from './info_args';

export interface IStrategyInfoProps {
  closeActiveStrategy: () => void;
  strategy: Strategy;
  x: number;
  y: number;
}

class StrategyInfo extends React.Component<IStrategyInfoProps, {}> {

  public render(): JSX.Element {
    const { closeActiveStrategy, strategy, x, y } = this.props;
    return (
      <div
        style={{ left: x - 25, top: y - 25 }}
        className="strategy_info__container"
        id="strategy_info__id"
        onClick={closeActiveStrategy}
      >
        <div className="strategy_info__title">
          <h3>{strategy.name}</h3>
          <div className="strategy_info__close">
            <i className="material-icons">close</i>
          </div>
        </div>
        <div className="strategy_info__description">
          {strategy.description}
        </div>
        <div className="strategy_info__classifier">
        <h4>Classifier:</h4>
          <div className="strategy_info__json">
            {JSON.stringify(strategy.classifier, null, 2)}
          </div>
        </div>
        {strategy.args.length > 0 ? <StrategyInfoArgs strategy={strategy} /> : ''}
      </div>
    );
  }

  private componentDidMount(): void {
    this.checkComponentHeight();
  }

  private componentDidUpdate() {
    this.checkComponentHeight();
  }

  private checkComponentHeight(): void {
    const element = document.getElementById('strategy_info__id');
    const windowHeight = window.innerHeight;
    const { bottom, height } = element.getBoundingClientRect();
    const diff = bottom - windowHeight;
    if (diff > -50) {
      element.style.top = '150px';
    }
  }
}

export default StrategyInfo;
