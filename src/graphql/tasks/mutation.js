import gql from 'graphql-tag';

export const TASKS_EDIT_MUTATION = gql`
    mutation tasksEdit($id: Int!, $name: String!, $description: String!, $completed: Boolean!) {
        task: tasksEdit(id: $id, name: $name, description: $description, completed: $completed) {
            name
            description
            completed
        }
    }
`

export const TASKS_ADD_MUTATION = gql`
    mutation tasksAdd($name: String!, $description: String!, $completed: Boolean!) {
        task: tasksAdd(name: $name, description: $description, completed: $completed) {
            name
            description
            completed
        }
    }
`

export const TASKS_DELETE_MUTATION = gql`
    mutation tasksDelete($id: Int!) {
        task: tasksDelete(id: $id) {
            name
            description
            completed
        }
    }
`