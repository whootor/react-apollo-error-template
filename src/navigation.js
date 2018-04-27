import React, { Component } from 'react'

class Navigation
 extends Component {
   state={underfetch: window.location.search === '?underfetch'}
  render () {
    const {underfetch} = this.state
    return (
      <div>
        <input
          type="checkbox"
          checked={underfetch}
          onChange={e => this.setState({underfetch: e.target.checked})} 
        />
        <a href={`/mutate-optimistic${underfetch ? '?underfetch': ''}`}>
          Example 1: Mutation with optimistic result arrives after query result, 
            crashes if underfetched, at query response arrival
        </a>
      </div>
    )
  }
}

export default Navigation
