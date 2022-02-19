import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useQuery, useMutation } from '@apollo/client';

import { TASKS_DELETE_MUTATION } from '../graphql/tasks/mutation';
import { TASKS_QUERY } from '../graphql/tasks/query';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

function TasksDelete({openModal, id, OpenDeleteUserClosed}) {
    const [open, setOpen] = React.useState(false);
    const [tasksDelete] = useMutation(TASKS_DELETE_MUTATION, {
        refetchQueries: [
            TASKS_QUERY,
            'getTasks'
        ]
    })

    

    const handleClose = () => {
        OpenDeleteUserClosed()
    }

    const deleteTask = async () => {
        const { data: task } = await tasksDelete({
            variables: {
                id,
            }
        })

        if(task) OpenDeleteUserClosed();
    }
    
    

    return (
        <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={style}>
                <Box display="flex" justifyContent="center" textAlign="center">
                    <h2>Are you sure you want to remove this task?</h2>
                </Box>
                <Box>
                    <Stack spacing={1} direction="row" justifyContent="center">
                        <Button variant="contained" onClick={ handleClose } >No</Button>
                        <Button variant="contained" onClick={ deleteTask } color="error">Yes</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default TasksDelete;