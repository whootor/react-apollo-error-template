import React, { Component } from 'react'
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class MutateFastOptimistic extends Component {
  state = { crashed: false }
  componentDidMount () {
    setTimeout(() => this.props.mutate({
      optimisticResponse: {
        __typename: 'Mutation',
        updateFast: {
          id: "1",
          name: 'John Doe (Optimist)',
          nick: window.location.search !== '?underfetch' ? 'Nick the optimist' : undefined,
          __typename: 'Person'
        }
      }
    }), 250)
  }

  componentWillReceiveProps ({data: {loading, personSlow}}, {crashed}) {
    if (!crashed && !loading && !personSlow) {
      this.setState({crashed: true})
    }
  }

  render () {
    const { loading, personSlow } = this.props.data
    const { crashed } = this.state
    return (
      <div>
        Example 3: Mutation with optimistic result arrives before query result, works if underfetched, at query response arrival
        <pre>{JSON.stringify({crashed, loading, personSlow}, null, 2)}</pre>  
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
)(MutateFastOptimistic)

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