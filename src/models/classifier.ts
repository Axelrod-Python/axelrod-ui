import { IFilterList } from '../constants/interfaces';

export interface IClassifierObject {
  memory_depth: number;
  stochastic: boolean;
  makes_use_of: string[];
  long_run_time: boolean;
  inspects_source: boolean;
  manipulates_source: boolean;
  manipulates_state: boolean;
}

export default class Classifier {

  [key: string]: any;
  public memoryDepth: number;
  public stochastic: boolean;
  public makesUseOf: string[];
  public longRunTime: boolean;
  public inspectsSource: boolean;
  public manipulatesSource: boolean;
  public manipulatesState: boolean;

  constructor({ memory_depth, stochastic, makes_use_of, long_run_time, inspects_source,
                manipulates_source, manipulates_state }: IClassifierObject) {
    if (memory_depth === -1) {
      this.memoryDepth = 99999999999;
    } else {
      this.memoryDepth = memory_depth;
    }
    this.stochastic = stochastic;
    this.makesUseOf = makes_use_of;
    this.longRunTime = long_run_time;
    this.inspectsSource = inspects_source;
    this.manipulatesSource = manipulates_source;
    this.manipulatesState = manipulates_state;
  }
}
