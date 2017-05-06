import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectContestType } from '../../actions';
import { IAction } from '../../constants/interfaces';
import Contest from '../../models/contest';

export interface IContestListProps {
  contest: Contest;
  selectContestType?: (name: string) => IAction;
}

const ContestType = ({ contest, selectContestType }: IContestListProps) => {
  return (
    <Link
      to={`/${contest.name.toLowerCase()}`}
      className="contest_type__container"
    >
      <div className="contest_type__name">
        <h1>{contest.name}</h1>
      </div>
      <div className="contest_type__description">
        {contest.description}
      </div>
    </Link>
  );
};

export default connect<{}, {}, IContestListProps>(null,
  { selectContestType }
)(ContestType);


