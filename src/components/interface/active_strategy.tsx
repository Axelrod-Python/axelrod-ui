
import * as React from 'react';
import { connect } from 'react-redux';

import { removeStrategyFromInterface } from '../../actions';
import { IAction } from '../../constants/interfaces';
import Strategy from '../../models/strategy';
import ArgInput from './arg_input';

export interface ISelectedStrategyProps {
  index: number;
  strategy: Strategy;
  removeStrategyFromInterface?: (strategy: Strategy) => IAction;
}

const ActiveStrategy = ({ index, removeStrategyFromInterface, strategy }: ISelectedStrategyProps) => {
  const handleClick = () => removeStrategyFromInterface(strategy);
  return (
    <div className="active_strategy__container" >
      <div className="active_strategy__left">
        <div className="active_strategy__name">{strategy.name}</div>
        <div className="active_strategy__args">
          {strategy.args.map((arg, i) => <ArgInput key={i} arg={arg} uuid={strategy.uuid} />)}
        </div>
      </div>
      <div className="active_strategy__close">
        <button onClick={handleClick} >X</button>
      </div>
    </div>
  );
};

export default connect<{}, {}, ISelectedStrategyProps>(null, { removeStrategyFromInterface })(ActiveStrategy);

