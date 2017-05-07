import * as React from 'react';

import Definition from '../../models/contest_definition';
import DefinitionParameter from './definition_parameter';

export interface IDefinitionInfoProps {
  definition: Definition;
  type: string;
}

const DefinitionInfo = ({ definition, type }: IDefinitionInfoProps) => {
  const otherKeys = Object.keys(definition.other);
  return (
    <div className="definition_info__parameters">
      <DefinitionParameter label="noise" value={definition.noise} />
      <DefinitionParameter label="turns" value={definition.turns} />
      {otherKeys.map((key, i) => (
        <DefinitionParameter key={i} label={key} value={String(definition.other[key])} />
      ))}
    </div>
  );
};

export default DefinitionInfo;
