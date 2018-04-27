import React, { Component } from 'react'
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class MountedQuery extends Component {
  render () {
    console.log('dfsdf', this.props)
    const { data: { loading, personFast } } = this.props;
    return (
      <div>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            <li key={personFast.id}>{personFast.name} [Nick: {personFast.nick}]</li>
            {/* <button onClick={() => this.moodate()}>BUTTon</button> */}
          </ul>
        )}    
      </div>
    )
  }
}

export default graphql(
  gql`
    query ErrorTemplate {
      personFast {
        id
        name
      }
    }
  `
)(MountedQuery);