import React, { Component } from "react";
import MountedQuery from './mounted'
import MutateSlowOptimistic from './mutate-slow-optimistic'
import MutateFast from './mutate-fast'
import MutateFastOptimistic from './mutate-fast-optimistic'
import Navigation from './navigation'

function getExample () {
  const example = window.location.pathname
  switch (example) {
    case '/mutate-slow-optimistic':
      return MutateSlowOptimistic
    case '/mutate-fast':
      return MutateFast
    case '/mutate-fast-optimistic':
      return MutateFastOptimistic
  }
}

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

    let Example = getExample()

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