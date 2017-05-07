import * as React from 'react';

import Argument from '../../models/argument';

export interface IParameterInputProps {
  param: Argument;
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
  value: string;
}

function formatParameterLabel(label: string): string {
  return label.replace('_', ' ');
}

const ParameterInput = ({ param, handleChange, value }: IParameterInputProps) => {
  return (
    <div className="interface__contest-param" >
      <span className="interface__contest-param-label" >
        {formatParameterLabel(param.parameter)}:
      </span>
      <input
        type="text"
        name={param.parameter}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default ParameterInput;
