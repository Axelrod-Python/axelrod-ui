import * as React from 'react';

import Strategy from '../../../models/strategy';
import StrategyArgument from './info_arg';

export interface IStrategyInfoArgsProps {
  strategy: Strategy;
}

const StrategyInfoArgs = ({ strategy }: IStrategyInfoArgsProps) => (
  <div className="strategy_info__arguments">
    <h4>Parameters:</h4>
    <div className="strategy_info__args">
      {strategy.args.map((arg, i) => <StrategyArgument key={i} arg={arg} />)}
    </div>
  </div>
);

export default StrategyInfoArgs;
