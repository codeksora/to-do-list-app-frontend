import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TasksEdit from './TasksEdit';
import TasksDelete from './TasksDelete';

function TasksList(props) {

    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [taskSelected, setTaskSelected] = React.useState(null);

    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    const OpenEditUser = (id) => {

      setOpenEditModal(true)
      setTaskSelected(id)
    }

    const OpenEditUserClosed = () => {
      setOpenEditModal(false)
    }

    const OpenDeleteUser = (id) => {
      setOpenDeleteModal(true)
      setTaskSelected(id)
    }

    const OpenDeleteUserClosed = () => {
      setOpenDeleteModal(false)
    }

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row, key) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">
                  <Chip label={row.completed ? 'Completed' : 'In process'} size="small" color={row.completed ? 'success' : 'warning'} />
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit" onClick={() => OpenEditUser(row.id)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton aria-label="delete" color="error" onClick={() => OpenDeleteUser(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {openEditModal && <TasksEdit openModal={openEditModal} id={taskSelected} OpenEditUserClosed={OpenEditUserClosed} />}
        {openDeleteModal && <TasksDelete openModal={openDeleteModal} id={taskSelected} OpenDeleteUserClosed={OpenDeleteUserClosed} />}
      </TableContainer>
    )
}

export default TasksList;