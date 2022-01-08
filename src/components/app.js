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
        currentContestId: resp._id,
        contests: { ...this.state.contests, [resp._id]: resp },
      });
    });
  };
  addName = (newName, contestId) => {
    api.addName(newName, contestId).then((resp) => {
      this.setState(
        {
          contests: {
            ...this.state.contests,
            [resp.updatedContest._id]: resp.updatedContest,
          },
          currentContestId: resp.updatedContest._id,
          names: { ...this.state.names, [resp.newName._id]: resp.newName },
        },
        () => {
          console.log('state updated');
          this.forceUpdate();
        }
      );
    });
  };
  fetchContestList = () => {
    pushState({ currentContestId: null }, '/main');
    api.fetchAllcontest().then((contestx) => {
      this.setState({
        currentContestId: null,
        contests: { ...contestx.contests },
      });
    });
  };
  fetchNames = (nameIds) => {
    console.log(`name ids are : ${nameIds}`);

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
    if (this.state.names) {
      console.log(this.state.names[nameId]);
      console.log(`nameID is:${nameId}`);
    }
    if (!this.state.names || !this.state.names[nameId]) {
      return {
        name: '...',
      };
    }
    return this.state.names[nameId];
  };
  currentContest() {
    console.log(this.state.contests[this.state.currentContestId]);
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
      return (
        <Contest
          {...this.currentContest()}
          fetchNames={this.fetchNames}
          lookupName={this.lookupName}
          contestListClick={this.fetchContestList}
          addName={this.addName}
        ></Contest>
      );
    }
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
