import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router';
import { getProjectRequirements, updateProjectRequirementContent, deleteProjectRequirement } from '../../../data_service/projects';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button';

export default () => {
  const [projectRequirements, setProjectRequirements] = useState();
  const [editRequirement, setEditRequirement] = useState();
  const [updatingContent, setUpdatingContent] = useState();
  const {projectId} = useParams();
  const fetchProjectRequirements = async () => {
    const data = await getProjectRequirements(projectId);
    setProjectRequirements(data);
  };
  useEffect(() => {
    fetchProjectRequirements();
  }, []);

  const onEditContent = (reqId, content) => {
    setEditRequirement(reqId);
    setUpdatingContent(content);
  };
  const onContentChanged = (event) => setUpdatingContent(event.target.value);
  const onContentUpdate = async (requirementId) => {
    await updateProjectRequirementContent(requirementId, updatingContent);
    setEditRequirement();
    await fetchProjectRequirements();
  };
  const onDeleteReq = async (reqId) => {
    await deleteProjectRequirement(reqId);
    await fetchProjectRequirements();
  };

  return (
    <div>
      {
        _.map(projectRequirements, ({id, content, sourceText}) => (
          <div>
            {id}
            {
              editRequirement === id
                ? (
                  <div>
                    <TextField onChange={onContentChanged} label="Name" defaultValue={updatingContent}/>
                    <Button onClick={() => onContentUpdate(id)}>Update</Button>
                  </div>
                )
                : (
                  <div>
                    {content}
                    <Button onClick={() => onEditContent(id, content)}>Edit</Button>
                    <Button onClick={() => onDeleteReq(id)}>Delete</Button>
                  </div>
                )
            }
            {sourceText}
          </div>
        ))
      }
    </div>
  );
}
