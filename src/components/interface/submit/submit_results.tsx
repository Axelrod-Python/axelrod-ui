import * as React from 'react';
import { Link } from 'react-router-dom';

export interface ISubmitResultsProps {
  contest: string;
  target: string;
}

const SubmitResults = ({ contest, target }: ISubmitResultsProps) => (
  <div className="submit_results__container" >
    <div>
      <i className="material-icons">check_circle</i>
    </div>
    <div>
      <span>{`${contest} successfully submitted  - `}</span>
      <Link to={target}>View results here</Link>
    </div>
  </div>
);

export default SubmitResults;
