import React, { Component } from 'react'
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class MutateOptimistic extends Component {
  componentDidMount () {
    setTimeout(() => this.props.mutate({
      optimisticResponse: {
        __typename: 'Mutation',
        updateFast: {
          id: 1,
          name: 'John Doe (Optimist)',
          // nick: window.location.search !== '?underfetch' ? 'Nick the optimist' : undefined,
          __typename: 'Person'
        }
      }
    }), 250)
  }

  render () {
    const { loading, personSlow } = this.props.data
    return (
      <div>
        Example 1: Mutation with Optimistic Response
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            <li key={personSlow.id}>{personSlow.name} [Nick: {personSlow.nick}]</li>
          </ul>
        )}    
      </div>
    )
  }
}
const one = graphql(
  gql`
    mutation ErrorTemplate {
      updateFast {
        id
        name
        # ${window.location.search !== '?underfetch' ? 'nick' : ''}
      }
    }
  `
)(MutateOptimistic)

export default graphql(
  gql`
    query ErrorTemplate {
      personSlow {
        id
        name
        nick
      }
    }
  `
)(one);