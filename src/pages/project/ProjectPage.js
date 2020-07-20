import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom';
import { getProject } from '../../data_service/projects';
import ProjectTabs from './ProjectTabs';

const Container = styled.div`

`;

const ProjectPage = () => {
  const [project, setProject] = useState();
  const {projectId} = useParams();
  const fetchProject = async () => {
    const data = await getProject(projectId);
    setProject(data);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (!project) {
    return <div>No project!</div>;
  }

  const onProjectUpdate = () => {
    fetchProject();
  };

  return (
    <Container>
      <h1>{project.name}</h1>
      <ProjectTabs projectId={projectId} onProjectUpdate={onProjectUpdate} />
    </Container>
  );
};

export default ProjectPage;
