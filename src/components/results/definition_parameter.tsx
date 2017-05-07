import * as React from 'react';

export interface IDefinitionParameterProps {
  label: string;
  value: string | number;
}

function formatParameterLabel(label: string): string {
  return label.replace('_', ' ');
}

const DefinitionParameter = ({ label, value }: IDefinitionParameterProps) => (
  <div className="definition_parameter__container" >
    <span className="definition_parameter__label" >
      {formatParameterLabel(label)}:
    </span>
    <span className="definition_parameter__value">{value}</span>
  </div>
);

export default DefinitionParameter;
