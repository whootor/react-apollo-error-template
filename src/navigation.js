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
        /> underfetch
        <ul>
        <li><a href={`/mutate-slow-optimistic${underfetch ? '?underfetch': ''}`}>
          Example 1: Mutation with optimistic result arrives after query result, 
            crashes if underfetched, at query response arrival
        </a></li>
        <li><a href={`/mutate-fast${underfetch ? '?underfetch': ''}`}>
          Example 2: Mutation without optimistic result arrives before query result, 
            works if underfetched, at query response arrival
        </a></li>
        <li><a href={`/mutate-fast-optimistic${underfetch ? '?underfetch': ''}`}>
          Example 3: Mutation with optimistic result arrives before query result,
            works if underfetched, at query response arrival
        </a></li>
        </ul>
        <hr />
      </div>
    )
  }
}

export default Navigation
