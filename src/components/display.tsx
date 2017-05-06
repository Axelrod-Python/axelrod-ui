import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { IReduxState } from '../constants/interfaces';

export interface IDisplayProps {
  location: string;
}

function generateGetClass(location: string): (target: string) => string {
  return (target: string) => {
    return location === target ? 'display__link-active' : 'display__link';
  };
}

const Display = ({ location }: IDisplayProps) => {
  const getClass = generateGetClass(location);
  return (
    <div className="display__container" >
      <Link to="/" className={getClass('/')} >
        <div className="display__label" >results</div>
        <div className="display_triangle" />
      </Link>
      <Link to="/tournament/" className={getClass('/tournament/')}>
        <div className="display__label" >tournament</div>
        <div className="display_triangle" />
      </Link>
      <Link to="/match/" className={getClass('/match/')}>
        <div className="display__label" >match</div>
        <div className="display_triangle" />
      </Link>
      <Link to="/moran%20process/" className={getClass('/moran process/')}>
        <div className="display__label" >moran process</div>
        <div className="display_triangle" />
      </Link>
    </div>
  );
};

function mapStateToProps(state: IReduxState): any {
  return {
    location: state.router.location.pathname,
  };
}

export default connect(mapStateToProps)(Display);
