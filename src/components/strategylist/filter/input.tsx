import * as debounce from 'lodash.debounce';
import * as React from 'react';
import { connect } from 'react-redux';
import { updateStrategyFilter } from '../../../actions/index';
import { IAction, IReduxState } from '../../../constants/interfaces';

export interface IStrategyFilterInputProps {
  name: string;
  below?: boolean;
  id?: string;
  label?: string;
  placeholder?: string;
  filterValue?: any;
  updateStrategyFilter?: (name: string, value: boolean | string) => IAction;
}

export interface IStrategyFilterInputState {
  filterValue: string;
}

class StrategyFilterInput extends React.Component<IStrategyFilterInputProps, IStrategyFilterInputState> {

  private sendFilterUpdate: any;

  constructor(props: IStrategyFilterInputProps) {
    super(props);
    this.state = {
      filterValue: '',
    };
    this.sendFilterUpdate = debounce(props.updateStrategyFilter, 300);
    this.updateFilter = this.updateFilter.bind(this);
  }

  public componentWillMount(): void {
    this.setState({ filterValue: this.props.filterValue });
  }

  public updateFilter(event: React.FormEvent<HTMLInputElement>) {
    const { name, updateStrategyFilter } = this.props;
    const filterValue = event.currentTarget.value;
    this.setState({ filterValue }, () => {
      this.sendFilterUpdate(name, filterValue);
    });
  }

  public render(): JSX.Element {
    const { id, label, name, below, placeholder } = this.props;
    return (
      <div className={`strategy_filter_panel__filter ${below ? 'filter__below' : ''}`} >
        {label ? <div className="strategy_filter_panel__label">{label}:</div> : undefined}
        {!label ? <i className="material-icons strategy_filter__search">search</i>: undefined}
        <div className="strategy_filter_panel__value" id={id ? id : ''}>
          <input
            type="text"
            placeholder=""
            name={name}
            onChange={this.updateFilter}
            value={this.state.filterValue} />
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

const StrategyInputContainer = connect<{}, {}, IStrategyFilterInputProps>(mapStateToProps,
  { updateStrategyFilter })(StrategyFilterInput);

export default StrategyInputContainer;
