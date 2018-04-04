import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import MutateButton from './MutateButton';
export default class App extends Component {
  render() {
    return (
      <main>
        <Query
          query={gql`
            query ErrorTemplate {
              people {
                id
                name
                pet {
                  id
                  name
                  species
                }
              }
            }
          `}
        >
          {({ loading, data }) => {
            if (loading) {
              return <p>Loading…</p>;
            }
            return (
              <ul>
                {data.people.map(person => (
                  <li key={person.id}>
                    {person.name}:{' '}
                    {person.pet
                      ? ` ${person.pet.name} (${person.pet.species})`
                      : 'None'}
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
        <MutateButton />
      </main>
    );
  }
}
