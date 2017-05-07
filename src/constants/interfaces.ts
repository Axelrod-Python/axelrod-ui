import Contest from '../models/contest';
import Result from '../models/result';
import Strategy from '../models/strategy';

/**
 *  redux interfaces
 */
export interface IReduxState {
  interface: IInterfaceReducer;
  strategy: IStrategyReducer;
  contest: IContestsReducer;
  results: IResultsReducer;
  router: any;
}

export interface IInterfaceReducer {
  strategies: Strategy[];
  type: string;
  isDragging: boolean;
}

export interface IFilterList extends Object {
  stochastic: boolean;
  longRunTime: boolean;
  makesUseOf: string;
  manipulatesState: boolean;
  manipulatesSource: boolean;
  inspectsSource: boolean;
  memoryDepth: string;
  minMemoryDepth: string;
  maxMemoryDepth: string;
  [name: string]: any;
}

export interface IResultsReducer {
  [key: string]: Result[];
  tournaments: Result[];
  matches: Result[];
  moranProcesses: Result[];
}

export interface IStrategyReducer {
  strategies: Strategy[];
  filters: IFilterList;
}

export interface IContestsReducer {
  contests: Contest[];
  results: any;
}

export interface IAction {
  error?: boolean;
  payload: any;
  type: string;
  meta?: any;
}

export interface IData {
  [key: string]: string;
}
