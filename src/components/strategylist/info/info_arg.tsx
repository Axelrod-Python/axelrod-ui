import * as React from 'react';

import Argument from '../../../models/argument';

export interface IStrategyInfoArgProps {
  arg: Argument;
}

const StrategyInfoArg = ({ arg }: IStrategyInfoArgProps) => (
  <div className="strategy_info_arg__container" >
    <div className="strategy_info_arg__label">
      {arg.parameter}{arg.value ? `: ${arg.value}` : ''}
    </div>
  </div>
);

export default StrategyInfoArg;
