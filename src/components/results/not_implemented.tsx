import * as React from 'react';

export interface INotImplementedProps {
  type: string;
}

const NotImplemented = ({ type }: INotImplementedProps) => (
  <div className="not_implemented__container" >
    <h1>{`Analysis for ${type} have not been implemented yet`}</h1>
  </div>
);

export default NotImplemented;
