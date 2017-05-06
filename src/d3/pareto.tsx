// tslint:disable:object-literal-sort-keys
import * as d3 from 'd3';
import * as React from 'react';
import { findDOMNode } from 'react-dom';

import { IData } from '../constants/interfaces';
import Result from '../models/result';

// tslint:disable-next-line:no-var-requires
const renderParetoChart = require('./barchart.js').default;

export interface IParetoProps {
  data: IData[];
}

export interface IParetoState {
  visible: boolean;
}

class ParetoChart extends React.Component<IParetoProps, IParetoState> {

  private data: any;

  constructor(props: IParetoProps) {
    super(props);
    this.state = {
      visible: true,
    };
    this.renderPareto = this.renderPareto.bind(this);
  }

  public componentDidMount(): void {
    this.renderPareto();

    let resizeTimer: any;
    window.onresize = (() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.renderPareto();
      }, 250);
    });
  }

  public componentWillUpdate() {
    this.renderPareto();
  }

  // container requires id and chart-wrapper class
  public render(): JSX.Element {
    return (
      <div
        className="chart-wrapper"
      />
    );
  }

  private renderPareto() {
    if (this.props.data) {
      const node = findDOMNode(this);

      d3.select(node).selectAll('*').remove();

      const width = window.innerWidth - 400;
      renderParetoChart(node, this.props.data, {
        height: 30,
        width: 100,
        showAxis: false,
        showCdf: false,
        margins: { top: 0, right: 0, bottom: 0, left: 0},
      });
    }
  }
}

export default ParetoChart;
