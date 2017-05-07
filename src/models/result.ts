import { IData } from '../constants/interfaces';
import Argument from './argument';
import Definition from './contest_definition';

export interface IResultObject {
  id: number;
  contest: string;
  created: string;
  last_updated: string;
  status: number;
  definition: any;
  results: any;
}

export default class Result {

  public id: number;
  public contestType: string;
  public created: Date;
  public updated: Date;
  public status: number;
  public definition: Definition;
  public results: any;
  public winner: string;

  constructor({ id, created, last_updated, status,
    contest, definition, results }: IResultObject) {
    this.id = id;
    this.created = new Date(created);
    this.updated = new Date(last_updated);
    this.status = status;
    this.definition = new Definition(definition);
    this.results = results;
    this.winner = this.getWinner(contest);
    this.contestType = contest;
  }

  public generateScoreViolin(): IData[] {
    const { normalised_scores, players, ranking } = this.results;
    return ranking.map((rank: number) => {
      return normalised_scores[rank].map((v: number) => {
        const player = players[rank];
        const value = v;
        return { value, player };
      });
    })
    .reduce((total: any, scores: any) => total.concat(scores), []);
  }

  public generateWinViolin(): IData[] {
    const { wins, players, ranking } = this.results;
    return ranking.map((rank: number) => {
      return wins[rank].map((v: number) => {
        const player = players[rank];
        const value = v;
        return { value, player };
      });
    })
    .reduce((total: any, scores: any) => total.concat(scores), []);
  }

  public generatePayoff(): any {
    return this.generateHeatMapData(this.results.payoff_matrix);
  }

  public generatePayoffDifference(): any {
    return this.generateHeatMapData(this.results.payoff_diffs_means);
  }

  public generateParetoData(): any {
    if (this.contestType !== 'tournament' || !this.results) {
      return undefined;
    }
    const { normalised_scores, players, ranking } = this.results;
    // only first 5 results
    return ranking.slice(0, 5).map((rank: number) => {
      const average =  normalised_scores[rank].reduce((total: number, v: number) => {
        return total + v;
      }, 0) / normalised_scores[rank].length;
      return {Category: players[rank], Amount: average * 100 }; // exagerate results for visual
    });
  }

  private generateHeatMapData(matrix: number[][]): any {
    const payoffData = matrix.reduce((data, row, x) => {
      const rowValues = row.reduce((rowData, value, y) => {
        return rowData.concat([{ x: x + 1, y: y + 1, value }]);
      }, []);
      return data.concat(rowValues);
    }, []);
    return {
      data: payoffData,
      xLabels: this.results.players,
      yLabels: this.results.players,
    };
  }

  private getWinner(contest: string): string {
    if (!this.results) {
      return undefined;
    }
    switch (contest) {
      case 'tournament':
        return this.results.ranked_names[0];
      case 'match':
        return this.results.winner;
      default:
        return this.results.winning_strategy_name;
    }
  }
}
