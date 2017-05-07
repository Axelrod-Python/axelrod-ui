import * as React from 'react';
import { Motion, presets, spring } from 'react-motion';

// tslint:disable-next-line:no-var-requires
const uuidV4 = require('uuid/v4');

export interface IResultPanelProps {
  label: string;
  children?: JSX.Element;
  active: boolean;
}

export interface IResultPanelState {
  active: boolean;
  height: number;
}

class ResultPanel extends React.Component<IResultPanelProps, IResultPanelState> {

  private uuid: string;

  constructor(props: IResultPanelProps) {
    super(props);
    this.state = {
      active: props.active,
      height: undefined,
    };
    this.handleToggleDisplay = this.handleToggleDisplay.bind(this);
    this.uuid = uuidV4();
  }

  public render(): JSX.Element {
    const { active, height } = this.state;
    const {label, children} = this.props;
    return (
      <div className="result_panel__container" >
        <div
          className="result_panel__header"
          role="button"
          onClick={this.handleToggleDisplay}
        >
          <div className="result_panel__label">{label}</div>
          <div className="result_panel__icon">
            <i className="material-icons">
              {active ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </i>
          </div>
        </div>
        <Motion style={{ value: spring(active ? 1 : 0)}} >
          {({ value }: any) =>
            // tslint:disable-next-line:jsx-wrap-multiline
            <div
              className="result_panel__child"
              id={this.uuid}
              style={{
                height: active ? `${value * height}px` : `${value * height}px`,
                opacity: value,
              }}
            >
              {active ? children : undefined}
            </div>
          }
        </Motion>
      </div>
    );
  }

  private handleToggleDisplay(): void {
    this.setState({ active: !this.state.active });
  }

  private componentWillReceiveProps(nextProps: IResultPanelProps) {
    this.setState({ active: nextProps.active });
  }

  private componentDidMount(): void {
    this.mapHeightToState();
  }

  private mapHeightToState() {
    const element = document.getElementById(this.uuid);
    if (element) {
      const height = element.offsetHeight;
      this.setState({ height });
    }
  }
}

export default ResultPanel;
