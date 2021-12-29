import React from 'react';
import Header from './Header';
import propTypes from 'prop-types';
import Contest from './Contest';
import ContestList from './ContestList';
import * as api from '../api';

//class based components are stateful
/* below is an example of a stateless component simple dom manipulation and return
const App = () => {
  return (
    <div>
      <Header headerMessage="Naming Contest" />
    </div>
  );
};
export default App;
*/
/* Below is a stateful component.  use only when using states */
const pushState = (obj, url) => window.history.pushState(obj, '', url);
const onPopState = (handler) => {
  window.onpopstate = handler;
};
class App extends React.Component {
  /** you can define it in constructor as well */
  constructor(props) {
    super(props);
  }
  /** You can chose to define props like this without constructor */
  state = {
    contests: this.props.initialData.contests,
    currentContestId: this.props.initialData.currentContestId,
  };
  fetchContest = (contestId) => {
    pushState({ currentContestId: contestId }, `/contest/${contestId}`);
    api.fetchContest(contestId).then((resp) => {
      this.setState({
        currentContestId: resp.id,
        contests: { ...this.state.contests, [contestId]: resp },
      });
    });
  };
  fetchContestList = () => {
    console.log('pushed back to list');
    pushState({ currentContestId: null }, '/main');
    api.fetchAllcontest().then((contestx) => {
      console.log(contestx);
      this.setState({
        currentContestId: null,
        contests: { ...contestx.contests },
      });
    });
  };
  fetchNames = (nameIds) => {
    console.log(nameIds.length);
    if (nameIds.length === 0) {
      return;
    }
    api.fetchNames(nameIds).then((resp) => {
      console.log('has names');
      console.log(resp);
      this.setState({ names: resp.names });
    });
  };
  lookupName = (nameId) => {
    console.log(this.state);
    console.log(`sys - ${nameId}`);
    if (!this.state.names || !this.state.names[nameId]) {
      return {
        name: '...',
      };
    }
    return this.state.names[nameId];
  };
  currentContest() {
    console.log('here;');

    console.log(this.state.contests[this.state.currentContestId]);
    return this.state.contests[this.state.currentContestId];
  }
  pageHeader() {
    console.log('page header again');

    if (this.state.currentContestId) {
      return this.currentContest().contestName;
    } else {
      return 'Naming Contest';
    }
  }
  currentContent() {
    console.log(`currentContent:${this.state.currentContestId}`);
    if (this.state.currentContestId) {
      return (
        <Contest
          {...this.currentContest()}
          fetchNames={this.fetchNames}
          lookupName={this.lookupName}
          contestListClick={this.fetchContestList}
        ></Contest>
      );
    }
    console.log(this.state.contests);
    return (
      <ContestList
        contests={this.state.contests}
        onContestClick={this.fetchContest}
      />
    );
  }

  componentDidMount() {
    onPopState((event) => {
      this.setState({ currentContestId: (event.state || {}).currentContestId });
    });
  }
  componentWillUnmount() {}
  render() {
    console.log('render again');
    console.log(this.pageHeader());

    return (
      <div className="App">
        <Header headerMessage={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
}
App.propTypes = {
  initialData: propTypes.object,
  currentContestId: propTypes.number,
};
export default App;
