import * as React from 'react';

export interface IStrategyFilterCheckboxDisabledProps {
  toggle: () => void;
}

const StrategyFilterCheckboxDisabled = ({ toggle }: IStrategyFilterCheckboxDisabledProps) => (
  <div
    className="strategy_filter_checkbox_disabled"
    onClick={toggle}
  >
    <i className="material-icons">close</i>
  </div>
);

export default StrategyFilterCheckboxDisabled;
