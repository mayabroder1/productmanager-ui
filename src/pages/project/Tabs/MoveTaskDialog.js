import Dialog from '@material-ui/core/Dialog';
import _ from 'lodash';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

export default function MoveTaskDialog({ onClose, tasks, selectedValue, open }) {

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Choose target task</DialogTitle>
      <List>
        {_.map(tasks, ({id, content}) => (
          <ListItem button onClick={() => handleListItemClick(id)} key={id}>
            <ListItemText primary={content} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
