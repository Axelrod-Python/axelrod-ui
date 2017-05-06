import * as React from 'react';

export interface IErrorsProps {
  errors: any[];
}

const Errors = ({ errors }: IErrorsProps) => (
  <div className="errors__container" >
    <i className="material-icons">warning</i>
    {errors.map((error, i) => (
      <div className="submit__error" key={i} >{error}</div>
    ))}
  </div>
);

export default Errors;

