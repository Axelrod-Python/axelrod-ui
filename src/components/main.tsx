import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route, RouteComponentProps,
  Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { IReduxState } from '../constants/interfaces';
import About from './about';
import Display from './display';
import Interface from './interface/interface';
import ResultList from './results/result_list';
import Results from './results/results';

class Main extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="main__content-container">
        <Switch>
          <Route exact={true} path="/" component={ResultList} />
          <Route exact={true} path="/about" component={About} />
          <Route exact={true} path="/results/:type/:id" component={Results} />
          <Route exact={true} path="/:contest" component={Interface} />
        </Switch>
      </div>
    );
  }
}

export default Main;
