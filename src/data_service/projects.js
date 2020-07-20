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
