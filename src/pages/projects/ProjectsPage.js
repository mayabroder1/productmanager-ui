import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

function ProjectsPage() {
  const [projects, setProjects] = useState(null);
  useEffect(async () => {
    let response = await fetch(`http://localhost:3005/projects`, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Accept': '*/*'
      }
    });
    let data = await response.json();
    setProjects(data);
  }, []);
  if (!projects) {
    return <div>No projects!</div>;
  }
  return (
    <div>
      {
        projects.map(({id, name}) => (
          <Link to={`/projects/${id}`}>{id} - {name}</Link>
        ))
      }
    </div>
  );
}

export default ProjectsPage;
