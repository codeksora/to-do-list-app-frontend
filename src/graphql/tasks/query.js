import gql from 'graphql-tag';

export const TASKS_QUERY = gql`
    query getTasks($name: String!, $completed: Int!) {
        tasks(name: $name, completed: $completed) {
            id
            name
            description
            completed
        }
    }
`;

export const TASK_QUERY = gql`
    query getTask($id: Int!) {
        task(id: $id) {
            name
            description
            completed
        }
    }
`

export const TASKS_BY_NAME_QUERY = gql`
    query getTasksByName($name: String!) {
        tasks: tasksByName(name: $name) {
            name
            description
            completed
        }
    }
`;