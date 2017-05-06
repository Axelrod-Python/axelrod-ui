import { IFilterList } from '../constants/interfaces';
import Argument from './argument';
import Classifier, { IClassifierObject } from './classifier';

export interface IStrategyObject {
  id: string;
  name: string;
  description: string;
  classifier: IClassifierObject;
  params: {
    [key: string]: any;
  };
}

export default class Strategy {

  public id: string;
  public name: string;
  public description: string;
  public classifier: Classifier;
  public args: Argument[];
  public uuid?: string;

  constructor({ id, name, description, classifier, params }: IStrategyObject) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.classifier = new Classifier(classifier);
    const args: Argument[] = [];
    // tslint:disable-next-line:prefer-const
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        args.push(new Argument(key, params[key]));
      }
    }
    this.args = args;
  }

  public matchBoolean(filter: boolean, value: boolean, current: boolean) {
    return filter !== undefined ? filter === value : current;
  }

  public matchesAnyFilter(filter: IFilterList): boolean {
    const { memoryDepth, minMemoryDepth, maxMemoryDepth,
      stochastic, makesUseOf, longRunTime, inspectsSource,
      manipulatesSource, manipulatesState } = this.classifier;
    if (filter.name && this.name.toLowerCase().indexOf(filter.name.toLowerCase()) > -1) {
      return true;
    }
    if (filter.stochastic !== undefined && filter.stochastic === stochastic) {
      return true;
    }
    if (filter.inspectsSource !== undefined && filter.inspectsSource === inspectsSource) {
      return true;
    }
    if (filter.longRunTime !== undefined && filter.longRunTime === longRunTime) {
      return true;
    }
    if (filter.manipulatesSource !== undefined && filter.manipulatesSource === manipulatesSource) {
      return true;
    }
    if (filter.manipulatesState !== undefined && filter.manipulatesState === manipulatesState) {
      return true;
    }
    if (filter.memoryDepth && memoryDepth === parseInt(filter.memoryDepth, 20)) {
      return true;
    }
    if (filter.minMemoryDepth && memoryDepth >= parseInt(filter.minMemoryDepth, 20)) {
      return true;
    }
    if (filter.maxMemoryDepth && memoryDepth <= parseInt(filter.maxMemoryDepth, 20)) {
      return true;
    }
    if (filter.makesUseOf) {
      const parameters = filter.makesUseOf.replace(/ /g, '').split(',');
      const match = parameters.every((parameter) => makesUseOf.indexOf(parameter) >= 0);
      if (match) {
        return true;
      }
    }
    return false;
  }

  public matchesAllFilters(filter: IFilterList): boolean {
    const { memoryDepth, minMemoryDepth, maxMemoryDepth,
      stochastic, makesUseOf, longRunTime, inspectsSource,
      manipulatesSource, manipulatesState } = this.classifier;
    if (filter.name && this.name.toLowerCase().indexOf(filter.name.toLowerCase()) === -1) {
      return false;
    }
    if (filter.stochastic !== undefined && filter.stochastic !== stochastic) {
      return false;
    }
    if (filter.inspectsSource !== undefined && filter.inspectsSource !== inspectsSource) {
      return false;
    }
    if (filter.longRunTime !== undefined && filter.longRunTime !== longRunTime) {
      return false;
    }
    if (filter.manipulatesSource !== undefined && filter.manipulatesSource !== manipulatesSource) {
      return false;
    }
    if (filter.manipulatesState !== undefined && filter.manipulatesState !== manipulatesState) {
      return false;
    }
    if (filter.memoryDepth && memoryDepth !== parseInt(filter.memoryDepth, 10)) {
      return false;
    }
    if (filter.minMemoryDepth && memoryDepth <= parseInt(filter.minMemoryDepth, 10)) {
      return false;
    }
    if (filter.maxMemoryDepth && memoryDepth >= parseInt(filter.maxMemoryDepth, 10)) {
      return false;
    }
    if (filter.makesUseOf) {
      const parameters = filter.makesUseOf.replace(/ /g, '').split(',');
      const match = parameters.every((parameter) => makesUseOf.indexOf(parameter) >= 0);
      if (!match) {
        return false;
      }
    }
    return true;
  }
}
