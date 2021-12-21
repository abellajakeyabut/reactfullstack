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

class App extends React.Component {
  /** you can define it in constructor as well */
  constructor(props) {
    super(props);
  }
  /** You can chose to define props like this without constructor */
  state = {
    contests: this.props.initialContests,
  };
  fetchContest = (contestId) => {
    pushState({ currentContestId: contestId }, `/contest/${contestId}`);
    api.fetchContest(contestId).then((resp) => {
      this.setState({
        currentContestId: resp.id,
        contests: { ...this.state.contests, [contestId]: resp },
      });
      console.log('fetch api done');
      console.log(resp.id);
      console.log(this.state.pageHeader);
      console.log(this.state.currentContestId);
    });
  };
  currentContest() {
    return this.state.contests[this.state.currentContestId];
  }
  pageHeader() {
    if (this.state.currentContestId) {
      return this.currentContest().contestName;
    } else {
      return 'Naming Contest';
    }
  }
  currentContent() {
    if (this.state.currentContestId) {
      return <Contest {...this.currentContest()}></Contest>;
    }
    return (
      <ContestList
        contests={this.state.contests}
        onContestClick={this.fetchContest}
      />
    );
  }
  componentDidMount() {
    console.log('refreshingxxx list');
    console.log('Component mounted');
  }
  componentWillUnmount() {
    console.log('unmounted');
  }
  render() {
    return (
      <div className="App">
        <Header headerMessage={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
}
App.propTypes = {
  initialContests: propTypes.object,
};
export default App;
