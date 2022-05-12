/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateExerciseInput = {
  id?: string | null;
  name: string;
  description?: string | null;
  type?: string | null;
  weight?: number | null;
  category?: string | null;
  sets?: number | null;
  reps?: Array<number | null> | null;
};

export type ModelExerciseConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  type?: ModelStringInput | null;
  weight?: ModelIntInput | null;
  category?: ModelStringInput | null;
  sets?: ModelIntInput | null;
  reps?: ModelIntInput | null;
  and?: Array<ModelExerciseConditionInput | null> | null;
  or?: Array<ModelExerciseConditionInput | null> | null;
  not?: ModelExerciseConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Exercise = {
  __typename: 'Exercise';
  id: string;
  name: string;
  description?: string | null;
  type?: string | null;
  weight?: number | null;
  category?: string | null;
  sets?: number | null;
  reps?: Array<number | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateExerciseInput = {
  id: string;
  name?: string | null;
  description?: string | null;
  type?: string | null;
  weight?: number | null;
  category?: string | null;
  sets?: number | null;
  reps?: Array<number | null> | null;
};

export type DeleteExerciseInput = {
  id: string;
};

export type CreateWorkoutInput = {
  title: string;
  completed?: boolean | null;
};

export type Workout = {
  __typename: 'Workout';
  id: string;
  title: string;
  exercises?: Array<Exercise | null> | null;
  completed?: boolean | null;
};

export type UpdateWorkoutInput = {
  id: string;
  title?: string | null;
  completed?: boolean | null;
};

export type DeleteWorkoutInput = {
  id: string;
};

export type ModelExerciseFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  type?: ModelStringInput | null;
  weight?: ModelIntInput | null;
  category?: ModelStringInput | null;
  sets?: ModelIntInput | null;
  reps?: ModelIntInput | null;
  and?: Array<ModelExerciseFilterInput | null> | null;
  or?: Array<ModelExerciseFilterInput | null> | null;
  not?: ModelExerciseFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelExerciseConnection = {
  __typename: 'ModelExerciseConnection';
  items: Array<Exercise | null>;
  nextToken?: string | null;
};

export type TableWorkoutFilterInput = {
  id?: TableIDFilterInput | null;
  title?: TableStringFilterInput | null;
  completed?: TableBooleanFilterInput | null;
};

export type TableIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type TableStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type TableBooleanFilterInput = {
  ne?: boolean | null;
  eq?: boolean | null;
};

export type WorkoutConnection = {
  __typename: 'WorkoutConnection';
  items?: Array<Workout | null> | null;
  nextToken?: string | null;
};

export type CreateExerciseMutationVariables = {
  input: CreateExerciseInput;
  condition?: ModelExerciseConditionInput | null;
};

export type CreateExerciseMutation = {
  createExercise?: {
    __typename: 'Exercise';
    id: string;
    name: string;
    description?: string | null;
    type?: string | null;
    weight?: number | null;
    category?: string | null;
    sets?: number | null;
    reps?: Array<number | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateExerciseMutationVariables = {
  input: UpdateExerciseInput;
  condition?: ModelExerciseConditionInput | null;
};

export type UpdateExerciseMutation = {
  updateExercise?: {
    __typename: 'Exercise';
    id: string;
    name: string;
    description?: string | null;
    type?: string | null;
    weight?: number | null;
    category?: string | null;
    sets?: number | null;
    reps?: Array<number | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteExerciseMutationVariables = {
  input: DeleteExerciseInput;
  condition?: ModelExerciseConditionInput | null;
};

export type DeleteExerciseMutation = {
  deleteExercise?: {
    __typename: 'Exercise';
    id: string;
    name: string;
    description?: string | null;
    type?: string | null;
    weight?: number | null;
    category?: string | null;
    sets?: number | null;
    reps?: Array<number | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateWorkoutMutationVariables = {
  input: CreateWorkoutInput;
};

export type CreateWorkoutMutation = {
  createWorkout?: {
    __typename: 'Workout';
    id: string;
    title: string;
    exercises?: Array<{
      __typename: 'Exercise';
      id: string;
      name: string;
      description?: string | null;
      type?: string | null;
      weight?: number | null;
      category?: string | null;
      sets?: number | null;
      reps?: Array<number | null> | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    completed?: boolean | null;
  } | null;
};

export type UpdateWorkoutMutationVariables = {
  input: UpdateWorkoutInput;
};

export type UpdateWorkoutMutation = {
  updateWorkout?: {
    __typename: 'Workout';
    id: string;
    title: string;
    exercises?: Array<{
      __typename: 'Exercise';
      id: string;
      name: string;
      description?: string | null;
      type?: string | null;
      weight?: number | null;
      category?: string | null;
      sets?: number | null;
      reps?: Array<number | null> | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    completed?: boolean | null;
  } | null;
};

export type DeleteWorkoutMutationVariables = {
  input: DeleteWorkoutInput;
};

export type DeleteWorkoutMutation = {
  deleteWorkout?: {
    __typename: 'Workout';
    id: string;
    title: string;
    exercises?: Array<{
      __typename: 'Exercise';
      id: string;
      name: string;
      description?: string | null;
      type?: string | null;
      weight?: number | null;
      category?: string | null;
      sets?: number | null;
      reps?: Array<number | null> | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    completed?: boolean | null;
  } | null;
};

export type GetExerciseQueryVariables = {
  id: string;
};

export type GetExerciseQuery = {
  getExercise?: {
    __typename: 'Exercise';
    id: string;
    name: string;
    description?: string | null;
    type?: string | null;
    weight?: number | null;
    category?: string | null;
    sets?: number | null;
    reps?: Array<number | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListExercisesQueryVariables = {
  filter?: ModelExerciseFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListExercisesQuery = {
  listExercises?: {
    __typename: 'ModelExerciseConnection';
    items: Array<{
      __typename: 'Exercise';
      id: string;
      name: string;
      description?: string | null;
      type?: string | null;
      weight?: number | null;
      category?: string | null;
      sets?: number | null;
      reps?: Array<number | null> | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetWorkoutQueryVariables = {
  id: string;
};

export type GetWorkoutQuery = {
  getWorkout?: {
    __typename: 'Workout';
    id: string;
    title: string;
    exercises?: Array<{
      __typename: 'Exercise';
      id: string;
      name: string;
      description?: string | null;
      type?: string | null;
      weight?: number | null;
      category?: string | null;
      sets?: number | null;
      reps?: Array<number | null> | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    completed?: boolean | null;
  } | null;
};

export type ListWorkoutsQueryVariables = {
  filter?: TableWorkoutFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListWorkoutsQuery = {
  listWorkouts?: {
    __typename: 'WorkoutConnection';
    items?: Array<{
      __typename: 'Workout';
      id: string;
      title: string;
      exercises?: Array<{
        __typename: 'Exercise';
        id: string;
        name: string;
        description?: string | null;
        type?: string | null;
        weight?: number | null;
        category?: string | null;
        sets?: number | null;
        reps?: Array<number | null> | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      completed?: boolean | null;
    } | null> | null;
    nextToken?: string | null;
  } | null;
};

export type OnCreateExerciseSubscription = {
  onCreateExercise?: {
    __typename: 'Exercise';
    id: string;
    name: string;
    description?: string | null;
    type?: string | null;
    weight?: number | null;
    category?: string | null;
    sets?: number | null;
    reps?: Array<number | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateExerciseSubscription = {
  onUpdateExercise?: {
    __typename: 'Exercise';
    id: string;
    name: string;
    description?: string | null;
    type?: string | null;
    weight?: number | null;
    category?: string | null;
    sets?: number | null;
    reps?: Array<number | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteExerciseSubscription = {
  onDeleteExercise?: {
    __typename: 'Exercise';
    id: string;
    name: string;
    description?: string | null;
    type?: string | null;
    weight?: number | null;
    category?: string | null;
    sets?: number | null;
    reps?: Array<number | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateWorkoutSubscriptionVariables = {
  id?: string | null;
  title?: string | null;
  completed?: boolean | null;
};

export type OnCreateWorkoutSubscription = {
  onCreateWorkout?: {
    __typename: 'Workout';
    id: string;
    title: string;
    exercises?: Array<{
      __typename: 'Exercise';
      id: string;
      name: string;
      description?: string | null;
      type?: string | null;
      weight?: number | null;
      category?: string | null;
      sets?: number | null;
      reps?: Array<number | null> | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    completed?: boolean | null;
  } | null;
};

export type OnUpdateWorkoutSubscriptionVariables = {
  id?: string | null;
  title?: string | null;
  completed?: boolean | null;
};

export type OnUpdateWorkoutSubscription = {
  onUpdateWorkout?: {
    __typename: 'Workout';
    id: string;
    title: string;
    exercises?: Array<{
      __typename: 'Exercise';
      id: string;
      name: string;
      description?: string | null;
      type?: string | null;
      weight?: number | null;
      category?: string | null;
      sets?: number | null;
      reps?: Array<number | null> | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    completed?: boolean | null;
  } | null;
};

export type OnDeleteWorkoutSubscriptionVariables = {
  id?: string | null;
  title?: string | null;
  completed?: boolean | null;
};

export type OnDeleteWorkoutSubscription = {
  onDeleteWorkout?: {
    __typename: 'Workout';
    id: string;
    title: string;
    exercises?: Array<{
      __typename: 'Exercise';
      id: string;
      name: string;
      description?: string | null;
      type?: string | null;
      weight?: number | null;
      category?: string | null;
      sets?: number | null;
      reps?: Array<number | null> | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    completed?: boolean | null;
  } | null;
};
