import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery, useMutation } from '@apollo/client';
import { TASK_QUERY } from '../graphql/tasks/query'
import { TASKS_EDIT_MUTATION } from '../graphql/tasks/mutation';
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

function TasksEdit({ openModal, id, OpenEditUserClosed }) {
    const [tasksEdit] = useMutation(TASKS_EDIT_MUTATION, {
        refetchQueries: [
            TASKS_QUERY,
            'getTasks'
        ]
    })
    const [open, setOpen] = React.useState(false);
    
    // const handleClose = () => setOpen(false);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [completed, setCompleted] = React.useState(false);

    const { loading, error, data, refetch } = useQuery(TASK_QUERY, {
        variables: {
            id
        }
    })

    React.useMemo(()=>{
        if(data) {
            setName(data.task.name); 
            setDescription(data.task.description); 
            setCompleted(data.task.completed); 
            setOpen(true);
        }
    },[data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleClose = () => {
        OpenEditUserClosed()
    }

    const save = async () => {
        const { data: task } = await tasksEdit({
            variables: {
                id,
                name,
                description,
                completed
            }
        })

        if(task) {
            OpenEditUserClosed();
            refetch();
        }
    }
    
    return(
        <Modal
        open={openModal}
        onClose={handleClose}
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

export default TasksEdit;