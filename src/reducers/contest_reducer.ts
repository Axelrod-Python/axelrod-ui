import { IAction, IContestsReducer } from '../constants/interfaces';
import { ACTIONS } from '../constants/types';
import Contest from '../models/contest';
import Strategy from '../models/strategy';

const contests = [
  new Contest({
    description: 'Round Robin tournament between two or more strategies',
    id: 1,
    max_players: -1,
    min_players: 2,
    name: 'Tournament',
    params: {
      noise: 0,
      repetitions: 10,
      turns: 200,
      with_morality: true,
    },
  }),
  new Contest({
    description: '1v1 Match between two strategies',
    id: 2,
    max_players: 2,
    min_players: 2,
    name: 'Match',
    params: {
      noise: 0,
      turns: 10,
    },
  }),
  new Contest({
    description: 'A population process simulating natural selection',
    id: 3,
    max_players: -1,
    min_players: 2,
    name: 'Moran Process',
    params: {
      mode: 'bd',
      noise: 0,
      turns: 200,
    },
  }),
];

export const initialState: IContestsReducer = {
  contests,
  results: undefined,
};

export default (state: IContestsReducer = initialState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.FETCH_GAMES:
      return Object.assign({}, {
        ...state,
        contests: action.payload.data.map((object: any) => new Contest(object)),
      });
    case ACTIONS.STORE_GAME_RESULTS:
      return {
        ...state,
        results: action.payload,
      };
    default:
      return state;
  }
};
