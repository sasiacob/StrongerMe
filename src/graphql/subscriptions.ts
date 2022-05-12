/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise {
    onCreateExercise {
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
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise {
    onUpdateExercise {
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
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise {
    onDeleteExercise {
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
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout($id: ID, $title: String, $completed: Boolean) {
    onCreateWorkout(id: $id, title: $title, completed: $completed) {
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
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout($id: ID, $title: String, $completed: Boolean) {
    onUpdateWorkout(id: $id, title: $title, completed: $completed) {
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
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout($id: ID, $title: String, $completed: Boolean) {
    onDeleteWorkout(id: $id, title: $title, completed: $completed) {
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
