import React, {useState} from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FilesTab from './Tabs/FilesTab';
import RequirementsTab from './Tabs/RequirementsTab';
import AssignmentsTab from './Tabs/AssignmentsTab';
import WBSTab from './Tabs/WBSTab';
import GeneralTab from './Tabs/GeneralTab';

const TabContentContainer = styled.div`

`;

export default ({projectId, onProjectUpdate}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="General" />
          <Tab label="Files" />
          <Tab label="Requirements" />
          <Tab label="Assignments" />
          <Tab label="WBS" />
        </Tabs>
      </AppBar>
      <TabContentContainer>
        {selectedTab === 0 && <GeneralTab onProjectUpdate={onProjectUpdate} />}
        {selectedTab === 1 && <FilesTab />}
        {selectedTab === 2 && <RequirementsTab />}
        {selectedTab === 3 && <AssignmentsTab />}
        {selectedTab === 4 && <WBSTab />}
      </TabContentContainer>
    </div>
  );
}
