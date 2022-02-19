import * as React from 'react';
import { TASKS_QUERY } from '../graphql/tasks/query';
import Button from '@mui/material/Button';

import TasksList from '../components/TasksList';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TasksNew from '../components/TasksNew';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import { useQuery, useMutation } from '@apollo/client';

import { TASKS_BY_NAME_QUERY } from '../graphql/tasks/query'

function Home() {

    const { data, loading, refetch } = useQuery(TASKS_QUERY, { variables: { name: '', completed: 1 } });

    const [openNewModal, setOpenNewModal] = React.useState(false)
    const [filter, setFilter] = React.useState(1);

    const searchByName = (e) => {
      refetch({
        name: e.target.value
      })
    }

    const filterTasks = (e) => {
      setFilter(e.target.value)

      refetch({
        completed: e.target.value
      })
    }

    const openNewModalClosed = () => {
      setOpenNewModal(false)
    }

    return (
      <Container maxWidth="lg">
        <Box pt={4} pb={5}>
          <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
            <h1>My tasks</h1> 
            <Button variant="contained" onClick={() => setOpenNewModal(true) }>New Task</Button>
          </Box>
          <Box mb={3}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
              <TextField id="outlined-basic" fullWidth label="Search by name" onChange={searchByName} variant="filled" mb={3} color="primary"/>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={filter}
                      onChange={filterTasks}
                      label="Filter"
                    >
                      <MenuItem value={1}>See All</MenuItem>
                      <MenuItem value={2}>See Only Completed</MenuItem>
                    </Select>

                  </FormControl>
              </Grid>
            </Grid>
                
                
            </Box>
          { data && <TasksList data={data.tasks} /> }
          { loading && 'Loading...' }
        </Box>
        {openNewModal && <TasksNew openModal={openNewModal} openNewModalClosed={openNewModalClosed} />}
      </Container>
    );
  }
  
  export default Home;