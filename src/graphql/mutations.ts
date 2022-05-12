/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createExercise = /* GraphQL */ `
  mutation CreateExercise(
    $input: CreateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    createExercise(input: $input, condition: $condition) {
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
export const updateExercise = /* GraphQL */ `
  mutation UpdateExercise(
    $input: UpdateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    updateExercise(input: $input, condition: $condition) {
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
export const deleteExercise = /* GraphQL */ `
  mutation DeleteExercise(
    $input: DeleteExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    deleteExercise(input: $input, condition: $condition) {
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
export const createWorkout = /* GraphQL */ `
  mutation CreateWorkout($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
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
export const updateWorkout = /* GraphQL */ `
  mutation UpdateWorkout($input: UpdateWorkoutInput!) {
    updateWorkout(input: $input) {
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
export const deleteWorkout = /* GraphQL */ `
  mutation DeleteWorkout($input: DeleteWorkoutInput!) {
    deleteWorkout(input: $input) {
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
