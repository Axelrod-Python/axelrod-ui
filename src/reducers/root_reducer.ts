import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import ContestReducer from './contest_reducer';
import InterfaceReducer from './interface_reducer';
import ResultsReducer from './results_reducer';
import StrategyReducer from './strategy_reducer';

const rootReducer = combineReducers({
  contest: ContestReducer,
  interface: InterfaceReducer,
  results: ResultsReducer,
  router: routerReducer,
  strategy: StrategyReducer,
});

export default rootReducer;
