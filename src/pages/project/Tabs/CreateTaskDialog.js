import Dialog from '@material-ui/core/Dialog';
import styled from 'styled-components';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Done from '@material-ui/icons/Done';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import InputLabel from '@material-ui/core/InputLabel';

const Container = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

export default function CreateTaskDialog({onClose, open, tasks, requirements}) {
  const [content, setContent] = useState();
  const [parentTask, setParentTask] = useState();
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const handleClose = () => {
    onClose({
      content,
      parentTaskId: parentTask,
      requirements: selectedRequirements
    });
  };

  return (
    <Dialog onClose={() => onClose(false)} aria-labelledby="simple-dialog-title" open={open}>
      <Container>
        <DialogTitle id="simple-dialog-title">Create task</DialogTitle>
        <TextField
          value={content}
          placeholder="Task content"
          onChange={(event) => setContent(event.target.value)}
        />
        <br/>

        <InputLabel id="parent-task-label">Parent task</InputLabel>
        <Select
          value={parentTask}
          labelId="parent-task-label"
          placeholder="Parent task"
          onChange={(event) => setParentTask(event.target.value)}
        >
          {
            _.map(tasks, (task) => (
              <MenuItem value={task.id}>{`${task.id} - ${task.content}`}</MenuItem>
            ))
          }
        </Select>
        <br/>
        <InputLabel id="reqs-label">Requirements</InputLabel>
        <Select
          value={selectedRequirements}
          multiple
          labelId="reqs-label"
          onChange={(event) => setSelectedRequirements(event.target.value)}
        >
          {
            _.map(requirements, (req) => (
              <MenuItem value={req.id}>{`${req.id} - ${req.content}`}</MenuItem>
            ))
          }
        </Select>

        <IconButton color="primary" component="span" onClick={handleClose}>
          <Done/>
          Create
        </IconButton>
      </Container>
    </Dialog>
  );
}
