import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let maxPetId = 0;

const petNames = ['Simba', 'Timon', 'Pumba', 'Mufasa', 'Rafiki', 'Zazu'];
const petSpecies = [
  'Lion',
  'Cat',
  'Dog',
  'Dragon',
  'Cheetah',
  'Wombat',
  'Hippo',
];

function createPet(id) {
  return {
    id: maxPetId++,
    species: getRandom(petSpecies),
    name: getRandom(petNames),
  };
}

const peopleData = [
  {
    id: 1,
    name: 'John Smith',
    occupation: 'Barber',
    pet: null,
  },
  {
    id: 2,
    name: 'Sara Smith',
    occupation: 'Clown',
    pet: null,
  },
  {
    id: 3,
    name: 'Budd Deey',
    occupation: 'Pilot',
    pet: null,
  },
];

const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    species: { type: GraphQLString },
  },
});

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    occupation: { type: GraphQLString },
    pet: { type: PetType },
  },
});
const QueryRootType = new GraphQLObjectType({
  name: 'query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData,
    },
  },
});

const MutationRootType = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    adoptPet: {
      type: PersonType,
      args: {},
      resolve: () => {
        const person = getRandom(peopleData);
        person.pet = createPet();
        return person;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryRootType,
  mutation: MutationRootType,
});
