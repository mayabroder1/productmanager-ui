import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { getProject, getProjectFiles, getProjects, uploadProjectFile } from '../../../data_service/projects';
import Button from '@material-ui/core/Button';
import { BASE_URL } from '../../../data_service/constants';

const FileList = styled.div`
  
`;

const FileUploadContainer = styled.div`
  
`;

const FileDetails = styled.div`
  margin-bottom: 10px;
  
`;

export default () => {
  const [projectFiles, setProjectFiles] = useState();
  const [newFile, setNewFile] = useState();
  const {projectId} = useParams();
  const fetchProjectFiles = async () => {
    const data = await getProjectFiles(projectId);
    setProjectFiles(data);
  };
  useEffect(() => {
    fetchProjectFiles();
  }, []);

  const onChangeHandler = (event) => {
    setNewFile(event.target.files[0]);
  };

  const onUpload = async () => {
    const data = new FormData();
    data.append('file', newFile);
    await uploadProjectFile(projectId, data);
    await fetchProjectFiles();
  };
  return (
    <div>
      <FileUploadContainer>
        <input type="file" name="file" onChange={onChangeHandler}/>
        <Button onClick={onUpload}>Upload</Button>
      </FileUploadContainer>
      <FileList>
        {
          projectFiles && _.map(projectFiles, ({id, name}) => (
            <FileDetails key={id}>
              File:
              {id}
              <a href={`${BASE_URL}/files/${name}`}>{name}</a>
            </FileDetails>
          ))
        }
      </FileList>
    </div>
  );
}
