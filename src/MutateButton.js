import React from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';

const ADOPT_PET_MUTATION_WORKS = gql`
  mutation AdoptPet {
    adoptPet {
      id
      pet {
        id
        name
        # This works
        species
      }
    }
  }
`;

const ADOPT_PET_MUTATION_BROKEN = gql`
  mutation AdoptPet {
    adoptPet {
      id
      pet {
        id
        name
        # Omitting a field that App uses breaks everything!
        # species
      }
    }
  }
`;

export default function MutateButton() {
  return (
    <ApolloConsumer>
      {client => (
        <React.Fragment>
          <button
            onClick={() => {
              client.mutate({
                mutation: ADOPT_PET_MUTATION_WORKS,
              });
            }}
          >
            Adopt a pet (works)
          </button>
          <button
            onClick={() => {
              client.mutate({
                mutation: ADOPT_PET_MUTATION_BROKEN,
              });
            }}
          >
            Adopt a pet (broken)
          </button>
        </React.Fragment>
      )}
    </ApolloConsumer>
  );
}
