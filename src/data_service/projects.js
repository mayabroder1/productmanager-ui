import { BASE_URL } from './constants';
import { getAuthTokenHeaders } from '../authUtils';

const DEFAULT_CONFIG = {
  mode: 'cors',
  headers: getAuthTokenHeaders()
};

export const getProjects = async () => {
  let response = await fetch(`${BASE_URL}/projects`, {
    mode: 'cors',
    headers: getAuthTokenHeaders()
  });
  return await response.json();
};

export const getProject = async (projectId) => {
  let response = await fetch(`${BASE_URL}/projects/${projectId}`, DEFAULT_CONFIG);
  return await response.json();
};

export const getProjectFiles = async (projectId) => {
  let response = await fetch(`${BASE_URL}/projectFiles/${projectId}`, DEFAULT_CONFIG);
  return await response.json();
};

export const getProjectRequirements = async (projectId) => {
  let response = await fetch(`${BASE_URL}/projectRequirements/${projectId}`, DEFAULT_CONFIG);
  return await response.json();
};

export const updateProjectRequirementContent = async (reqId, content) => {
  let response = await fetch(`${BASE_URL}/projectRequirements/${reqId}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthTokenHeaders()
    },
    body: JSON.stringify({updatedContent: content})
  });
  return response.json();
};

export const deleteProjectRequirement = async (requirementId) => {
  let response = await fetch(`${BASE_URL}/projectRequirement/${requirementId}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: getAuthTokenHeaders()
  });
};

export const deleteProject = async (projectId) => {
  let response = await fetch(`${BASE_URL}/projects/${projectId}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: getAuthTokenHeaders()
  });
  return await response.json();
};

export const addNewProject = async (projectName) => {
  let response = await fetch(`${BASE_URL}/projects`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthTokenHeaders()
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
      'Content-Type': 'application/json',
      ...getAuthTokenHeaders()
    },
    body: JSON.stringify(updatedProject)
  });
  return response.json();
};

export const uploadProjectFile = async (projectId, file) => {
  let response = await fetch(`${BASE_URL}/projectFiles/${projectId}`, {
    mode: 'cors',
    method: 'POST',
    body: file,
    headers: getAuthTokenHeaders()
  });
  return response.json();
};

export const getProjectTasks = async (projectId) => {
  let response = await fetch(`${BASE_URL}/projectTasks/${projectId}`, {
    mode: 'cors',
    headers: getAuthTokenHeaders()
  });
  return await response.json();
};

export const moveProjectTask = async (taskToMoveId, targetTaskId) => {
  let response = await fetch(`${BASE_URL}/projectTasks/${taskToMoveId}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthTokenHeaders()
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
      'Content-Type': 'application/json',
      ...getAuthTokenHeaders()
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
      'Content-Type': 'application/json',
      ...getAuthTokenHeaders()
    },
    body: JSON.stringify({
      taskId, reqId
    })
  });
  return response.json();
};

export const deleteTask = async (taskId) => {
  await fetch(`${BASE_URL}/projectTasks/${taskId}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: getAuthTokenHeaders()
  });
};

export const createTask = async (projectId, newTask) => {
  await fetch(`${BASE_URL}/projectTasks/${projectId}`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthTokenHeaders()
    },
    body: JSON.stringify(newTask)
  });
};
