import { BASE_URL } from './constants';

export const getProjects = async () => {
  let response = await fetch(`${BASE_URL}/projects`, {
    mode: 'cors'
  });
  return await response.json();
};

export const getProject = async (projectId) => {
  let response = await fetch(`${BASE_URL}/projects/${projectId}`, {
    mode: 'cors'
  });
  return await response.json();
};

export const getProjectFiles = async (projectId) => {
  let response = await fetch(`${BASE_URL}/projectFiles/${projectId}`, {
    mode: 'cors'
  });
  return await response.json();
};

export const getProjectRequirements = async (projectId) => {
  let response = await fetch(`${BASE_URL}/projectRequirements/${projectId}`, {
    mode: 'cors'
  });
  return await response.json();
};

export const updateProjectRequirementContent = async (reqId, content) => {
  let response = await fetch(`${BASE_URL}/projectRequirements/${reqId}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({updatedContent: content})
  });
  return response.json();
};

export const deleteProjectRequirement = async (requirementId) => {
  let response = await fetch(`${BASE_URL}/projectRequirement/${requirementId}`, {
    mode: 'cors',
    method: 'DELETE',
  });
};

export const deleteProject = async (projectId) => {
  let response = await fetch(`${BASE_URL}/projects/${projectId}`, {
    mode: 'cors',
    method: 'DELETE',
  });
  return await response.json();
};

export const addNewProject = async (projectName) => {
  let response = await fetch(`${BASE_URL}/projects`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: projectName})
  });
  return response.json();
};

export const updateProject = async (updatedProject) => {
  let response = await fetch(`${BASE_URL}/projects/${updatedProject.id}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedProject)
  });
  return response.json();
};

export const uploadProjectFile = async (projectId, file) => {
  let response = await fetch(`${BASE_URL}/projectFiles/${projectId}`, {
    mode: 'cors',
    method: 'POST',
    body: file
  });
  return response.json();
};

export const getProjectTasks = async (projectId) => {
  let response = await fetch(`${BASE_URL}/projectTasks/${projectId}`, {
    mode: 'cors'
  });
  return await response.json();
};

export const moveProjectTask = async (taskToMoveId, targetTaskId) => {
  let response = await fetch(`${BASE_URL}/projectTasks/${taskToMoveId}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      parentTaskId: targetTaskId
    })
  });
  return response.json();
};

export const updateProjectTaskContent = async (taskId, content) => {
  let response = await fetch(`${BASE_URL}/projectTasks/${taskId}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content
    })
  });
  return response.json();
};

export const linkTaskToRequirement = async (taskId, reqId) => {
  let response = await fetch(`${BASE_URL}/linkTaskToRequirement`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      taskId, reqId
    })
  });
  return response.json();
};

export const deleteTask = async (taskId) => {
  let response = await fetch(`${BASE_URL}/projectTasks/${taskId}`, {
    mode: 'cors',
    method: 'DELETE',
  });
  return await response.json();
};
