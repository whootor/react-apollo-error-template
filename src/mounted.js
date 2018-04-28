import React, { Component } from 'react'
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class MountedQuery extends Component {
  render () {
    console.log('dfsdf', this.props)
    const { data: { loading, personFast } } = this.props;
    return (
      <pre>{JSON.stringify({loading, personFast}, null, 2)}</pre>
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