// tslint:disable:object-literal-sort-keys
import * as d3 from 'd3';
import * as React from 'react';
import { findDOMNode } from 'react-dom';

import { IData } from '../constants/interfaces';
import Result from '../models/result';
import heatmap from './heatmap';

interface IHeatMapData {
  x: number;
  y: number;
  value: number;
}

export interface IHeatMapProps {
  data: IHeatMapData[];
  xLabels: string[];
  yLabels: string[];
}

export interface IHeatMapState {
  visible: boolean;
}

class HeatMapChart extends React.Component<IHeatMapProps, IHeatMapState> {

  constructor(props: IHeatMapProps) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  public componentDidMount(): void {
    this.renderHeatMap();

    let resizeTimer: any;
    window.onresize = (() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.renderHeatMap();
      }, 250);
    });
  }

  public componentWillUpdate() {
    this.renderHeatMap();
  }

  // container requires id and chart-wrapper class
  public render(): JSX.Element {
    return (
      <div className="results__chart">
        <div
          className="chart-wrapper"
          id="heatmap__container"
        />
      </div>
    );
  }

  private renderHeatMap() {
    const node = findDOMNode(this);
    const { data, xLabels, yLabels } = this.props;

    const maxWidth = window.innerWidth - 400;
    const elementWidth = maxWidth > 700 ? 700 : maxWidth;

    d3.select(node).selectAll('*').remove();
    heatmap(node, {
      data,
      xLabels,
      yLabels,
      elementWidth,
    });
  }
}

export default HeatMapChart;
