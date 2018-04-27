import React, { Component } from "react";
import MountedQuery from './mounted'
import MutateOptimistic from './mutate-optimistic'
import Navigation from './navigation'

class App extends Component {
  state = {
    mountExample: false
  }
  componentDidMount () {
    setTimeout(() => this.setState({
      mountExample: true
    }), 100)
  }
  render() {
    const example = window.location.pathname
    const underfetch = window.location.search === '?underfetch'

    let Example = null
    switch (example) {
      case '/mutate-optimistic':
        Example = MutateOptimistic
        break;
    }

    if (!Example) {
      return <Navigation />
    }

    return (
      <main>
        <Navigation />
        <MountedQuery />    
        {this.state.mountExample && <Example />}
      </main>
    );
  }
}

export default App