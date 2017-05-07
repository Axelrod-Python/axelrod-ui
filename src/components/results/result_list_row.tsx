import * as React from 'react';
import { Link } from 'react-router-dom';

import Pareto from '../../d3/pareto';
import Result from '../../models/result';

export interface IResultListItemProps {
  result: Result;
}

// tslint:disable-next-line:no-var-requires
const uuidV4 = require('uuid/v4');

const ResultListItem = ({ result }: IResultListItemProps) => {
  const id = uuidV4();
  return (
    <Link
      to={`results/${result.contestType}s/${result.id}/`}
      className="result_list__row"
    >
      <div className="result_list__contest result_list__column">
        {result.contestType}
      </div>
      <div className="result_list__players result_list__column">
        {result.definition.playerList.length}
      </div>
      <div className="result_list__winner result_list__column">
        {result.winner}
      </div>
      <div className="result_list__pareto result_list__column">
        <Pareto data={result.generateParetoData()} />
      </div>
      <div className="result_list__date result_list__column">
        {result.created.toDateString()}
      </div>
    </Link>
  );
};

export default ResultListItem;
