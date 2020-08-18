import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router';
import { updateProject, getProject, deleteProject } from '../../../data_service/projects';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button';

const EditNewProject = styled.div``;

export default ({onProjectUpdate}) => {
  const [project, setProject] = useState();
  const [projectName, setProjectName] = useState();
  const {projectId} = useParams();
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const data = await getProject(projectId);
      setProject(data);
    })();
  }, []);

  const onProjectNameChanged = (event) => {
    setProjectName(event.target.value);
  };

  const onChangeProjectClicked = async () => {
    console.log('debug asdf', project);
    const updatedProject = await updateProject({...project, name: projectName});
    onProjectUpdate();
    setProject(updatedProject);
  };
  if (!project) {
    return <div>No Project</div>
  }

  const onDeleteClicked = () => {
    deleteProject(projectId);
    history.push('/projects');
  };

  return (
    <div>

      <EditNewProject>
        <TextField onChange={onProjectNameChanged} label="Name" defaultValue={project.name} />
        <Button onClick={onChangeProjectClicked}>Update</Button>
      </EditNewProject>
      <Button
        variant="contained"
        color="secondary"
        onClick={onDeleteClicked}
      >
        Delete project
      </Button>
    </div>
  );
}
