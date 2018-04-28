import React, { Component } from 'react'
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class MutateSlow extends Component {
  state = { crashed: false }
  componentDidMount () {
    setTimeout(() => this.props.mutate(), 250)
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
        Example 4: Mutation without optimistic result arrives after query result, works if underfetched, at query response arrival
        <pre>{JSON.stringify({crashed, loading, personSlow}, null, 2)}</pre>
      </div>
    )
  }
}

const one = graphql(
  gql`
    mutation ErrorTemplate {
      updateSlow {
        id
        name
        ${window.location.search !== '?underfetch' ? 'nick' : ''}
      }
    }
  `
)(MutateSlow)

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