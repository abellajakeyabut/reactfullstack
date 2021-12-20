import React from 'react';
import Header from './Header';
import ContestPreview from './contestPreview';

import axios from 'axios';
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
class App extends React.Component {
  /** you can define it in constructor as well */
  constructor(props) {
    super(props);
  }
  /** You can chose to define props like this without constructor */
  state = {
    pageHeader: 'Naming Contest',
    contests: this.props.initialContests,
  };
  componentDidMount() {
    console.log('refreshingxxx list');
    axios
      .get('http://localhost:8080/api/contests')
      .then((resp) => {
        console.log('api responded');
        console.log('mapping data');

        this.setState({ contests: resp.data.contests });
        console.log('done');
      })
      .catch(console.error);

    console.log('Component mounted');
  }
  componentWillUnmount() {
    console.log('unmounted');
  }
  render() {
    return (
      <div className="App">
        <Header headerMessage={this.state.pageHeader} />
        <div>
          {this.state.contests.map((contest) => (
            <ContestPreview {...contest} key={contest.id} />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
