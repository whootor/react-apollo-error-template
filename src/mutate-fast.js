import React, { Component } from 'react'
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class MutateFast extends Component {
  componentDidMount () {
    setTimeout(() => this.props.mutate(), 250)
  }

  render () {
    const { loading, personSlow } = this.props.data
    return (
      <div>
        Example 2: Mutation without optimistic result arrives before query result, works if underfetched, at query response arrival
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
        ${window.location.search !== '?underfetch' ? 'nick' : ''}
      }
    }
  `
)(MutateFast)

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