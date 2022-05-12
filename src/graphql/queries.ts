/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
      id
      name
      description
      type
      weight
      category
      sets
      reps
      createdAt
      updatedAt
    }
  }
`;
export const listExercises = /* GraphQL */ `
  query ListExercises(
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        type
        weight
        category
        sets
        reps
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
      id
      title
      exercises {
        id
        name
        description
        type
        weight
        category
        sets
        reps
        createdAt
        updatedAt
      }
      completed
    }
  }
`;
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: TableWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        exercises {
          id
          name
          description
          type
          weight
          category
          sets
          reps
          createdAt
          updatedAt
        }
        completed
      }
      nextToken
    }
  }
`;
