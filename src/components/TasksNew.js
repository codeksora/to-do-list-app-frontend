import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { TASKS_ADD_MUTATION } from '../graphql/tasks/mutation';
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

function TasksNew({ openModal, openNewModalClosed }) {
    const [tasksAdd] = useMutation(TASKS_ADD_MUTATION, {
        refetchQueries: [
            TASKS_QUERY,
            'getTasks'
        ]
    })
    const [open, setOpen] = React.useState(true);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [completed, setCompleted] = React.useState(false);
    
    const save = async () => {
        const { data: task } = await tasksAdd({
            variables: {
                name,
                description,
                completed
            }
        })
        
        if(task) openNewModalClosed();
    }
    const handleClose = () => {
        openNewModalClosed()
    };
    
    return (
        <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <h2>Add Task</h2>

                <IconButton aria-label="close" onClick={ handleClose}>
                    <CloseIcon />
                  </IconButton>
            </Box>
            <Box mb={3}>
                <TextField id="outlined-basic" fullWidth label="Name" variant="outlined" mb={3} name="name" onChange={(e) => setName(e.target.value)} defaultValue={name} />

            </Box>
            <Box mb={2}>
                <TextField id="outlined-basic" fullWidth label="Description" variant="outlined" multiline rows={4} onChange={(e) => setDescription(e.target.value)} defaultValue={description} />

            </Box>
            <Box mb={3}>
                <FormControlLabel control={<Checkbox />} checked={completed}  onChange={(e) => setCompleted(e.target.checked)} label="Completed" />

            </Box>

            <Box>
                <Stack spacing={1} direction="row" justifyContent="end">
                    <Button variant="outlined" onClick={ handleClose }>Close</Button>
                    <Button variant="contained" onClick={ save }>Save</Button>
                </Stack>
            </Box>
        </Box>
      </Modal>
    )
}

export default TasksNew;