import { IAction, IResultsReducer } from '../constants/interfaces';
import { ACTIONS } from '../constants/types';
import Result from '../models/result';

export const initialState: IResultsReducer = {
  matches: [],
  moranProcesses: [],
  tournaments: [],
};

function generateResults(data: any[], contest: string): Result[] {
  return data.map((object: any) => {
    const objectWithContest: any = Object.assign({}, object, { contest });
    return new Result(objectWithContest);
  });
}

export default (state: IResultsReducer = initialState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.FETCH_MATCHES:
      return Object.assign({}, {
        ...state,
        matches:  generateResults(action.payload.data, 'match'),
      });
    case ACTIONS.FETCH_MORAN_PROCESSES:
      return Object.assign({}, {
        ...state,
        moranProcesses: generateResults(action.payload.data, 'moran process'),
      });
    case ACTIONS.FETCH_TOURNAMENTS:
      return Object.assign({}, {
        ...state,
        tournaments:  generateResults(action.payload.data, 'tournament'),
      });
    default:
      return state;
  }
};
