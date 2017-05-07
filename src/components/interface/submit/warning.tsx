import * as React from 'react';

export interface IWarningProps {
  message: string;
}

const Warning = ({ message }: IWarningProps) => (
  <div className="submit__error-container">
    <i className="material-icons">warning</i>
    <div className="submit__warning">{message}</div>
  </div>
);

export default Warning;
