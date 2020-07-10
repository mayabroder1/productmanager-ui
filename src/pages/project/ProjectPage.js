import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';

function ProjectPage() {
  const [project, setProject] = useState(null);
  const {projectId} = useParams();
  useEffect(async () => {
    let response = await fetch(`http://localhost:3005/projects/${projectId}`, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Accept': '*/*'
      }
    });
    let data = await response.json();
    setProject(data);
  }, []);
  if (!project) {
    return <div>No project!</div>;
  }
  return (
    <div>
     PROEJCT {project.title} !!!
    </div>
  );
}

export default ProjectPage;
