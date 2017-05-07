import * as axios from 'axios';

// tslint:disable-next-line:no-var-requires
const uuidV4 = require('uuid/v4');

import { IAction } from '../constants/interfaces';
import { ACTIONS, API, API_CONFIG } from '../constants/types';
import Strategy from '../models/strategy';

export function fetchStrategies(): IAction {
  const request = axios.get(`${API}/strategies/`, API_CONFIG);
  return {
    payload: request,
    type: ACTIONS.FETCH_STRATEGIES,
  };
}

export function fetchMatches(): IAction {
  const request = axios.get(`${API}/matches/`, API_CONFIG);
  return {
    payload: request,
    type: ACTIONS.FETCH_MATCHES,
  };
}

export function fetchMoranProcesses(): IAction {
  const request = axios.get(`${API}/moran/`, API_CONFIG);
  return {
    payload: request,
    type: ACTIONS.FETCH_MORAN_PROCESSES,
  };
}

export function fetchTournaments(): IAction {
  const request = axios.get(`${API}/tournaments/`, API_CONFIG);
  return {
    payload: request,
    type: ACTIONS.FETCH_TOURNAMENTS,
  };
}

export function draggingStrategy(isDragging: boolean): IAction {
  return {
    payload: isDragging,
    type: ACTIONS.DRAGGING_STRATEGY,
  };
}

export function updateStrategyFilter(name: string, value: string | boolean): IAction {
  return {
    payload: { name, value },
    type: ACTIONS.UPDATE_STRATEGY_FILTERS,
  };
}

export function addStrategyToInterface(strategy: Strategy): IAction {
  const strategyWithId = Object.assign({}, strategy, {
    uuid: uuidV4(),
  });
  return {
    payload: { strategy: strategyWithId },
    type: ACTIONS.ADD_STRATEGY_TO_INTERFACE,
  };
}

export function updateStrategyParameter(uuid: string, name: string, value: string): IAction {
  return {
    payload: { uuid, name, value },
    type: ACTIONS.UPDATE_STRATEGY_PARAMETER,
  };
}

export function removeStrategyFromInterface(strategy: Strategy): IAction {
  return {
    payload: { uuid: strategy.uuid },
    type: ACTIONS.REMOVE_STRATEGY_FROM_INTERFACE,
  };
}

export function clearInterfaceStrategies(): IAction {
  return {
    payload: null,
    type: ACTIONS.CLEAR_STRATEGIES_FROM_INTERFACE,
  };
}

export function selectContestType(name: string): IAction {
  return {
    payload: name,
    type: ACTIONS.SELECT_CONTEST_TYPE,
  };
}

export function resetContestType(): IAction {
  return {
    payload: { name },
    type: ACTIONS.RESET_CONTEST_TYPE,
  };
}

export function storeContestResults(results: any): IAction {
  return {
    payload: results,
    type: ACTIONS.STORE_GAME_RESULTS,
  };
}
