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
        <a href={`/mutate-optimistic${underfetch ? '?underfetch': ''}`}>Example 1</a>
      </div>
    )
  }
}

export default Navigation
