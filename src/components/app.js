import ReactDOM from 'react-dom';
import React from 'react';
import Header from './header';
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
  state = { pageHeader: 'Naming Contest' };
  componentDidMount() {
    console.log('Component mounted');
  }
  componentWillUnmount() {
    console.log('unmounted');
  }
  render() {
    return (
      <div className="App">
        <Header headerMessage={this.state.pageHeader} />
      </div>
    );
  }
}
export default App;
