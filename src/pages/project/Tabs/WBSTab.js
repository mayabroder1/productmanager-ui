import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import "treant-js/Treant.css";
import "treant-js/examples/basic-example/basic-example.css";
import Raphael from "raphael";
import { getProjectRequirements, getProjectTasks } from '../../../data_service/projects';
import { useParams } from 'react-router';

window.Raphael = Raphael;

let Treant = require("treant-js/Treant");
Treant = Treant.Treant;

const getChildren = (data, rootId) => {
  return _.map(
    _.filter(data, ({parentTaskId}) => parentTaskId === rootId),
    ({id, content}) => ({
      text: {name: id + ' - ' + content},
      children: getChildren(data, id)
    })
  );
};

export default () => {
  const {projectId} = useParams();

  const fetchProjectTasks = async () => {
    const data = await getProjectTasks(projectId);
    const root = _.find(data, ({id, parentTaskId}) => (parentTaskId === null));
    const nodeStructure = {
      text: {name: root.id + ' - ' + root.content},
      children: getChildren(data, root.id)
    };

    console.log(nodeStructure);
    const treeConfig = {
      chart: {container: "#OrganiseChart-simple"},
      nodeStructure
    };
    new Treant(treeConfig);
  };

  useEffect(() => {
    fetchProjectTasks();
  }, []);
  return (
    <div>
      <div className="chart" id="OrganiseChart-simple" />
    </div>
  );
}
