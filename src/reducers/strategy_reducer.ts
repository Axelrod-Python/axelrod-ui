import { IAction, IStrategyReducer } from '../constants/interfaces';
import { ACTIONS } from '../constants/types';
import Strategy from '../models/strategy';

export const initialState: IStrategyReducer = {
  filters: {
    inspectsSource: undefined,
    longRunTime: undefined,
    makesUseOf: '',
    manipulatesSource: undefined,
    manipulatesState: undefined,
    maxMemoryDepth: '',
    memoryDepth: '',
    minMemoryDepth: '',
    name: '',
    stochastic: undefined,
  },
  strategies: [],
};

export default (state: IStrategyReducer = initialState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.INITIALIZE_STRATEGIES:
      return Object.assign({}, {
        ...state,
        strategies: action.payload.map((object: any) => new Strategy(object)),
      });
    case ACTIONS.FETCH_STRATEGIES:
      return Object.assign({}, {
        ...state,
        strategies: action.payload.data.map((object: any) => new Strategy(object)),
      });
    case ACTIONS.UPDATE_STRATEGY_FILTERS:
      const { name, value } = action.payload;
      const updatedFilters: any = Object.assign({}, state.filters);
      updatedFilters[name] = value;
      return Object.assign({}, {
        ...state,
        filters: updatedFilters,
      });
    default:
      return state;
  }
};
