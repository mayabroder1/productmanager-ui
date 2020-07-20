import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { addNewProject, getProjects } from '../../data_service/projects';
import TextField from '@material-ui/core/TextField';

const Container = styled.div`

`;

const ProjectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 150px;
  border: 1px solid #6c6c6c;
  margin-right: 20px; 
  margin-bottom: 20px;
  &:hover {
    background-color: #d7d7d7;
    border-color: #8c8c8c;
    cursor: pointer;
  }
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AddNewProject = styled.div`
  margin-bottom: 20px;
`;

function ProjectsPage() {
  const history = useHistory();
  const [projects, setProjects] = useState();
  const [newProjectName, setNewProjectName] = useState();
  useEffect(() => {
    (async () => {
      const data = await getProjects();
      setProjects(data);
    })();
  }, []);

  const onNewProjectNameChanged = (event) => {
    setNewProjectName(event.target.value);
  };

  const onAddNewProjectClicked = async () => {
    const updatedProjects = await addNewProject(newProjectName);
    setProjects(updatedProjects);
  };

  return (
    <Container>
      <h1>Projects</h1>
      <AddNewProject>
        <TextField onChange={onNewProjectNameChanged} label="Name"/>
        <Button disabled={!newProjectName} onClick={onAddNewProjectClicked}>Add new project</Button>
      </AddNewProject>
      <ProjectsContainer>
        {
          _.map(projects, ({id, name}) => (
            <ProjectBox onClick={() => history.push(`/projects/${id}`)} key={id}>
              {name}
            </ProjectBox>
          ))
        }
      </ProjectsContainer>
      <div>
        {
          _.isEmpty(projects) && <div>No Projects!</div>
        }
      </div>
    </Container>
  );
}

export default ProjectsPage;
