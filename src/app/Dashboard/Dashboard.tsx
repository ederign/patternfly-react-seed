import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { TableColumnManagement } from './Table';
import { WizardInModalDemo } from './WizardInModalDemo';
import {
  Button,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent,
} from '@patternfly/react-core';
import { DrawerPanelBody } from '@patternfly/react-core/src/components';

import { DrawerContentMine } from './DrawerContent';

const Dashboard: React.FunctionComponent = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const drawerRef = React.useRef<HTMLDivElement>();

  const onExpand = () => {
    drawerRef.current && drawerRef.current.focus();
  };

  const onClick = () => {
    setIsExpanded(!isExpanded);
  };

  const onCloseClick = () => {
    setIsExpanded(false);
  };

  const panelContent = (
    <DrawerPanelContent>
      <DrawerHead>
        <h1>My Jupyter Notebook</h1>

        <DrawerActions>
          <Button variant="primary">Edit</Button>
          <DrawerCloseButton onClick={onCloseClick} />
        </DrawerActions>
      </DrawerHead>
      <DrawerContentBody>
        <DrawerContentMine></DrawerContentMine>
      </DrawerContentBody>
    </DrawerPanelContent>
  );
  return (
    <>
      <Drawer isExpanded={isExpanded} onExpand={onExpand}>
        <DrawerContent panelContent={panelContent}>
          <DrawerContentBody>
            <TableColumnManagement onClick={onClick} />
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>

      {/* <WizardInModalDemo /> */}
    </>
  );
};

export { Dashboard };
