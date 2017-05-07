import * as React from 'react';
import { connect } from 'react-redux';

import { updateStrategyFilter } from '../../../actions/index';
import { IAction, IReduxState } from '../../../constants/interfaces';
import DisabledCheckbox from './checkbox_disabled';

export interface IStrategyFilterCheckboxProps {
  name: string;
  label: string;
  filterValue?: any;
  updateStrategyFilter?: (name: string, value: boolean | string) => IAction;
}

export interface IStrategyFilterCheckboxState {
  checked: boolean;
}

class StrategyFilterCheckbox extends React.Component<IStrategyFilterCheckboxProps, IStrategyFilterCheckboxState> {

  constructor(props: IStrategyFilterCheckboxProps) {
    super(props);
    this.state = {
      checked: undefined,
    };
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  public toggleCheckbox(): void {
    const { filterValue, updateStrategyFilter } = this.props;
    let updatedStatus: boolean;
    switch (filterValue) {
      case false:
        updatedStatus = undefined;
        break;
      case true:
        updatedStatus = false;
        break;
      default:
        updatedStatus = true;
        break;
    }
    updateStrategyFilter(this.props.name, updatedStatus);
  }

  public renderCheckbox(): JSX.Element {
    const { filterValue } = this.props;
    if (filterValue === undefined) {
      return <DisabledCheckbox toggle={this.toggleCheckbox} />;
    } else {
      return (
        <input
          type="checkbox"
          name={name}
          onChange={this.toggleCheckbox}
          checked={filterValue}
        />
      );
    }
  }

  public render(): JSX.Element {
    const { label, name, filterValue } = this.props;
    return (
      <div className="strategy_filter_panel__filter">
        <div className="strategy_filter_panel__label">{label}:</div>
        <div className="strategy_filter_panel__value">
          {this.renderCheckbox()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IReduxState, ownProps: any): {} {
  return {
    filterValue: state.strategy.filters[ownProps.name],
  };
}

const StrategyCheckboxContainer = connect<{}, {}, IStrategyFilterCheckboxProps>(mapStateToProps,
  { updateStrategyFilter })(StrategyFilterCheckbox);

export default StrategyCheckboxContainer;
