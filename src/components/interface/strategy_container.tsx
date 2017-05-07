import * as React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { addStrategyToInterface } from '../../actions';
import { IAction, IReduxState } from '../../constants/interfaces';
import { ItemTypes } from '../../constants/types';
import Strategy from '../../models/strategy';
import ActiveStrategy from './active_strategy';
import Prompt from './prompt_for_strategy';

export interface IStrategyContainerProps {
  addStrategyToInterface?: (strategy: Strategy) => IAction;
  connectDropTarget?: any;
  strategies?: Strategy[];
  strategyBeingDragged?: boolean;
}

class StrategyContainer extends React.Component<IStrategyContainerProps, {}> {

  constructor(props: IStrategyContainerProps) {
    super(props);
    this.state = {
    };
  }

  public render(): JSX.Element {
    const { connectDropTarget, strategies, strategyBeingDragged } = this.props;
    const cls = strategyBeingDragged ? ' strategy_container__target' : '';
    return connectDropTarget(
      <div className={`strategy_container__container${cls}`} id="strategy_container" >
        {strategies.length === 0 ? <Prompt /> : undefined}
        {strategies.map((s, i) => <ActiveStrategy key={i} index={i} strategy={s} />)}
      </div>
    );
  }
}

const strategyTarget = {
  drop(targetProps: IStrategyContainerProps, monitor: any) {
    const incomingStrategy = monitor.getItem();
    targetProps.addStrategyToInterface(incomingStrategy.strategy);
    const container = document.getElementById('strategy_container');
    container.scrollTop = container.scrollHeight;
  }
};

function collect(connect: any): any {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function mapStateToProps(state: IReduxState) {
  return {
    strategies: state.interface.strategies,
    strategyBeingDragged: state.interface.isDragging,
  };
}

const dndConfigured = DropTarget(ItemTypes.STRATEGY, strategyTarget, collect)(StrategyContainer);
export default connect<{}, {}, IStrategyContainerProps>(mapStateToProps, { addStrategyToInterface })(dndConfigured);
