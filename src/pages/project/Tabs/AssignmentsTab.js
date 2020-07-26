import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { useParams } from 'react-router';
import {
  getProjectRequirements,
  getProjectTasks,
  moveProjectTask,
  updateProjectTaskContent,
  linkTaskToRequirement,
  deleteTask
} from '../../../data_service/projects';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import Done from '@material-ui/icons/Done';
import MoveTaskDialog from './MoveTaskDialog';
import IconButton from '@material-ui/core/IconButton';
import AddReqDialog from './AddReqDialog';

const SubtreeContainer = styled.div`
  margin-left: ${({level}) => level * 15}px;
`;

const TaskBoxContainer = styled.div`
  background-color: aliceblue;
  border: 1px solid beige;
  border-radius: 20px;
  margin: 10px;
  padding: 15px;
  width: 400px;
`;

const Requirement = styled.div`
  display: flex;
`;

const ReqId = styled.div`
  margin-right: 10px;
`;

const TaskBox = ({task: {id, content, requirements: taskRequirements}, onMoveClicked, refreshData, requirements}) => {
  const [addReqOpen, setAddReqOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatingContent, setUpdatingContent] = useState(content);

  const onEditContent = (taskId, content) => {
    setIsEditing(true);
    setUpdatingContent(content);
  };
  const onContentChanged = (event) => setUpdatingContent(event.target.value);
  const onContentUpdate = async () => {
    await updateProjectTaskContent(id, updatingContent);
    setIsEditing(false);
    await refreshData();
  };

  const onAddReq = () => {
    setAddReqOpen(true);
  };

  const handleClose = async (reqId) => {
    await linkTaskToRequirement(id, reqId);
    setAddReqOpen(false);
    await refreshData();
  };

  const onDeleteClicked = async () => {
    await deleteTask(id);
    await refreshData();
  };

  return (
    <TaskBoxContainer>
      <strong>{id}</strong>
      <div>
        {
          isEditing ? (
            <TextField onChange={onContentChanged} label="Content" defaultValue={updatingContent}/>
          ) : <span>
            {content}
          </span>
        }
        {
          isEditing ? (
            <IconButton color="primary" component="span" onClick={onContentUpdate}>
              <Done />
            </IconButton>
          ) : (
            <IconButton color="primary" component="span" onClick={onEditContent}>
              <Edit />
            </IconButton>
          )
        }
      </div>
      {
        !_.isEmpty(taskRequirements) && (
          <div>
            Requirements:
            {
              _.map(taskRequirements, ({id, content: reqContent}) => (
                <Requirement>
                  <ReqId>{id}</ReqId>
                  <div>{reqContent}</div>
                </Requirement>
              ))
            }
            <IconButton color="primary" component="span" onClick={onAddReq}>
              <Add />
            </IconButton>
          </div>
        )
      }
      <Button onClick={() => onMoveClicked(id)}>Move</Button>
      <Button onClick={onDeleteClicked}>Delete</Button>
      <AddReqDialog
        requirements={requirements}
        open={addReqOpen}
        onClose={handleClose}
      />
    </TaskBoxContainer>
  );
};

const TaskSubtree = ({currentTask, tasks, level, onMoveClicked, refreshData, requirements}) => {
  const subTasks = _.filter(tasks, ({parentTaskId}) => parentTaskId === currentTask.id);

  return (
    <SubtreeContainer level={level}>
      <TaskBox task={currentTask} onMoveClicked={onMoveClicked} refreshData={refreshData} requirements={requirements} />
      {(
        _.map(subTasks, (subTask) => (
          <TaskSubtree
            currentTask={subTask}
            tasks={tasks}
            level={level + 1}
            onMoveClicked={onMoveClicked}
            refreshData={refreshData}
          />
        ))
      )}
    </SubtreeContainer>
  );
};

export default () => {
  const [projectTasks, setProjectTasks] = useState();
  const [requirements, setRequirements] = useState();
  const {projectId} = useParams();
  const fetchProjectTasks = async () => {
    const data = await getProjectTasks(projectId);
    const requirements = await getProjectRequirements(projectId);
    setProjectTasks(data);
    setRequirements(requirements);
  };
  useEffect(() => {
    fetchProjectTasks();
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [taskToMove, setTaskToMove] = useState();

  const handleClose = async (targetTaskId) => {
    setOpen(false);
    await moveProjectTask(taskToMove, targetTaskId);
    fetchProjectTasks();
  };

  // const onDeleteReq = async (reqId) => {
  //   await deleteProjectRequirement(reqId);
  //   await fetchProjectRequirements();
  // };

  const onMoveClicked = (taskId) => {
    setTaskToMove(taskId);
    setOpen(true);
  };

  const rootProjectTasks = _.filter(projectTasks, ({parentTaskId}) => parentTaskId === null);
  return (
    <div>
      {
        _.map(rootProjectTasks, (task) => (
          <div>
            <TaskSubtree
              currentTask={task}
              tasks={projectTasks}
              level={0}
              onMoveClicked={onMoveClicked}
              refreshData={fetchProjectTasks}
              requirements={requirements}
            />
          </div>
        ))
      }
      <MoveTaskDialog
        selectedValue={selectedValue}
        tasks={projectTasks}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
