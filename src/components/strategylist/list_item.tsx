import * as React from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

import { draggingStrategy } from '../../actions';
import { IAction, IReduxState } from '../../constants/interfaces';
import { ItemTypes } from '../../constants/types';
import Strategy from '../../models/strategy';
import StrategyInfo from './info/info';

export interface IStrategyListItemProps {
  strategy: Strategy;
  active: boolean;
  setActiveInfo: (name: string, x: number, y: number) => void;
  connectDragSource?: any;
  isDragging?: any;
  draggingStrategy?: (isDragging: boolean) => IAction;
  dragContainerExists?: boolean;
  style: {};
}

export interface IStrategyListItemState {
  infoVisible: boolean;
  xCoord: number;
  yCoord: number;
}

class StrategyListItem extends React.Component<any, IStrategyListItemState> {

  public constructor(props: any) {
    super(props);
    this.state = {
      infoVisible: false,
      xCoord: undefined,
      yCoord: undefined,
    };
    this.handleShowInfo = this.handleShowInfo.bind(this);
  }

  public handleShowInfo(event: React.MouseEvent<HTMLDivElement>): void {
    const { name } = this.props.strategy;
    this.props.setActiveInfo(name, event.clientX + 45, event.clientY + 10);
  }

  public render(): JSX.Element {
    const { active, isDragging, connectDragSource,
      strategy, dragContainerExists, style } = this.props;
    const draggingStyle = isDragging ? {
      opacity: 0.5,
    } : {};
    const component = (
      <div
        className="strategy_list_item__container"
        style={{
          ...style,
          ...draggingStyle,
        }}
      >
        <div className="strategy_list_item__title">{strategy.name}</div>
        <div
          className="strategy_list_item__info"
          onClick={this.handleShowInfo}
        >
          <i className="material-icons">info_outline</i>
        </div>
      </div>
    );

    // allow this component to interface with the drag and drop only
    // if a contest type has been selected and there is a target
    // for the item to be dragged to
    return dragContainerExists ? connectDragSource(component) : component;
  }
}

const strategySource = {
  beginDrag(props: IStrategyListItemProps) {
    props.draggingStrategy(true);
    return { strategy: props.strategy };
  },
  endDrag(props: IStrategyListItemProps) {
    props.draggingStrategy(false);
  }
};

function collect(connect: any, monitor: any): any {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function mapStateToProps(state: IReduxState) {
  return {
    dragContainerExists: state.interface.type !== undefined,
  };
}

const DraggableListItem = DragSource(
  ItemTypes.STRATEGY,
  strategySource,
  collect)(StrategyListItem);

export default connect<{}, {}, IStrategyListItemProps>(mapStateToProps,
  { draggingStrategy })(DraggableListItem);
