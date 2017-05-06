// tslint:disable:object-literal-sort-keys
import * as d3 from 'd3';
import * as React from 'react';
import { findDOMNode } from 'react-dom';

import { IData } from '../constants/interfaces';
import Result from '../models/result';

// tslint:disable:no-var-requires
const makeDistroChart = require('./distrochart.js').default;
const uuidV4 = require('uuid/v4');

export interface IViolinChartProps {
  data: IData[];
  bandwidth: number;
  clamp: number;
}

export interface IViolinChartState {
  visible: boolean;
}

class ViolinChart extends React.Component<IViolinChartProps, IViolinChartState> {

  constructor(props: IViolinChartProps) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  public componentDidMount(): void {
    this.renderViolin();

    let resizeTimer: any;
    window.onresize = (() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.renderViolin();
      }, 250);
    });
  }

  // container requires id and chart-wrapper class
  public render(): JSX.Element {
    return (
      <div
        className="chart-wrapper"
        id={`violin_chart__${uuidV4()}`}
      />
    );
  }

  private renderViolin() {
    const node = findDOMNode(this);
    const { bandwidth, clamp} = this.props;

    d3.select(node).selectAll('*').remove();

    const width = window.innerWidth - 400;
    const chart1: any = makeDistroChart({
      data: this.props.data,
      xName: 'player',
      yName: 'value',
      axisLabels: { xAxis: null, yAxis: 'Scores' },
      selector: node,
      chartSize: { height: 350, width },
      constrainExtremes: false,
    });

    chart1.renderDataPlots();
    chart1.renderViolinPlot({ clamp, width: 80, bandwidth });
    chart1.renderBoxPlot({ showWhiskers: false });
  }
}

export default ViolinChart;
