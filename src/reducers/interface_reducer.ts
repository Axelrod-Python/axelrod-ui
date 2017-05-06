import { IAction, IInterfaceReducer } from '../constants/interfaces';
import { ACTIONS } from '../constants/types';
import Argument from '../models/argument';
import Strategy from '../models/strategy';

export const initialState: IInterfaceReducer = {
  isDragging: true,
  strategies: [],
  type: undefined,
};

export default (state: IInterfaceReducer = initialState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.DRAGGING_STRATEGY:
      return {
        ...state,
        isDragging: action.payload,
      };
    case ACTIONS.ADD_STRATEGY_TO_INTERFACE:
      return {
        ...state,
        strategies: state.strategies.concat(action.payload.strategy),
      };
    case ACTIONS.UPDATE_STRATEGY_PARAMETER:
      const { uuid, name, value } = action.payload;
      return {
        ...state,
        strategies: state.strategies.map((s, i) => {
          if (s.uuid === uuid) {
            const args = s.args.map((arg) => {
              if (arg.parameter === name) {
                return Object.assign({}, arg, {
                  value
                });
              }
              return arg;
            });
            return Object.assign({}, s, {
              args
            });
          }
          return s;
        }),
      };
    case ACTIONS.REMOVE_STRATEGY_FROM_INTERFACE:
      const removeUuid = action.payload.uuid;
      return {
        ...state,
        strategies: state.strategies.filter((s) => s.uuid !== removeUuid),
      };
    case ACTIONS.CLEAR_STRATEGIES_FROM_INTERFACE:
      return {
        ...state,
        strategies: [],
      };
    case ACTIONS.SELECT_CONTEST_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case ACTIONS.RESET_CONTEST_TYPE:
      return {
        ...state,
        strategies: [],
        type: undefined,
      };
    default:
      return state;
  }
};
