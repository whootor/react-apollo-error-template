import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    nick: { type: GraphQLString },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    personFast: {
      type: PersonType,
      resolve: async () => {
        // qawait new Promise((resolve) => setTimeout(resolve, 1000))
        return {
          id: 1,
          nick: 'JD',
          name: 'John Doe (Fast)'
        }
      },
    },
    personSlow: {
      type: PersonType,
      resolve: async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return {
          id: 1,
          nick: 'JD',
          name: 'John Doe (Slow)'
        }
      },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateFast: {
      type: PersonType,
      resolve: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return {
          id: 1,
          nick: 'JD',
          name: 'John Doe (Mutated Fast)'
        }
      },
    },
    updateSlow: {
      type: PersonType,
      resolve: async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return {
          id: 1,
          nick: 'JD',
          name: 'John Doe (Mutated Slow)'
        }
      },
    },
  },
});

export const schema = new GraphQLSchema({ 
  query: QueryType,
  mutation: MutationType
});
