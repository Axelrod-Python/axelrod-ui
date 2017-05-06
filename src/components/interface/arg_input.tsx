import * as React from 'react';
import { connect } from 'react-redux';

import { updateStrategyParameter } from '../../actions';
import { IAction } from '../../constants/interfaces';
import Argument from '../../models/argument';

export interface IArgInputProps {
  arg: Argument;
  uuid: string;
  updateStrategyParameter?: (uuid: string, name: string, value: string) => IAction;
}


class ArgInput extends React.Component<IArgInputProps, {}> {

  constructor(props: IArgInputProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(event: React.FormEvent<HTMLInputElement>): void {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const { uuid, updateStrategyParameter } = this.props;
    this.setState({ value }, () => updateStrategyParameter(uuid, name, value));
  }

  public formatParameterLabel(label: string): string {
    return label.replace('_', ' ');
  }

  public render(): JSX.Element {
    const { arg } = this.props;
    return (
      <div className="arg_input__container" >
        <span>{this.formatParameterLabel(arg.parameter)}:</span>
        <input
          type="text"
          name={arg.parameter}
          value={arg.value || ''}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default connect<{}, {}, IArgInputProps>(null, { updateStrategyParameter })(ArgInput);

