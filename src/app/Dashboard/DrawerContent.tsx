import * as React from 'react';
import { Checkbox, Tab, TabTitleText, Tabs, Tooltip } from '@patternfly/react-core';
import {
  Button,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from '@patternfly/react-core';
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon';
import { Button, Progress, Stack, StackItem } from '@patternfly/react-core';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Flex,
  FlexItem,
  Gallery,
  MenuToggle,
  Select,
  SelectList,
  SelectOption,
  Spinner,
  Title,
} from '@patternfly/react-core';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import flex from '@patternfly/react-styles/css/utilities/Flex/flex';
import text from '@patternfly/react-styles/css/utilities/Text/text';
import l_gallery_GridTemplateColumns_min from '@patternfly/react-tokens/dist/esm/l_gallery_GridTemplateColumns_min';
import { CardEventsView } from './CardEventsView';

const DrawerContentMine: React.FunctionComponent = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [isBox, setIsBox] = React.useState<boolean>(false);
  // Toggle currently active tab
  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number,
  ) => {
    setActiveTabKey(tabIndex);
  };

  const toggleBox = (checked: boolean) => {
    setIsBox(checked);
  };

  const tooltip = (
    <Tooltip content="Aria-disabled tabs are like disabled tabs, but focusable. Allows for tooltip support." />
  );
  return (
    <div>
      <Tabs
        activeKey={activeTabKey}
        onSelect={handleTabClick}
        isBox={isBox}
        aria-label="Tabs in the default example"
        role="region"
      >
        <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>}>
          <br />
          <br />
          <DescriptionList>
            <DescriptionListGroup>
              <DescriptionListTerm>Name</DescriptionListTerm>
              <DescriptionListDescription>My Jupyter Notebook</DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Kind</DescriptionListTerm>
              <DescriptionListDescription>
                <a href="#">jupyter-lab</a>
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Labels</DescriptionListTerm>
              <DescriptionListDescription>example, example2</DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Pod config info</DescriptionListTerm>
              <DescriptionListDescription>afinity: x</DescriptionListDescription>
              <DescriptionListDescription>tolleration: x</DescriptionListDescription>
            </DescriptionListGroup>

            <DescriptionListGroup>
              <DescriptionListTerm>Workspace Health</DescriptionListTerm>
              <Stack>
                <StackItem>
                  <Progress value={10} title="CPU" />
                </StackItem>
                <br />
                <StackItem>
                  <Progress color="red" value={90} title="Memory" />
                </StackItem>
              </Stack>
            </DescriptionListGroup>
          </DescriptionList>
        </Tab>

        <Tab eventKey={1} title={<TabTitleText>Activity</TabTitleText>}>
          <br />
          <br />
          <DescriptionList>
            <DescriptionListGroup>
              <DescriptionListTerm>Last Activity</DescriptionListTerm>
              <DescriptionListDescription>23 hours ago</DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Other important info</DescriptionListTerm>
              <DescriptionListDescription>bla bla</DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>
          <br />
        </Tab>
        <Tab eventKey={2} title={<TabTitleText>Events</TabTitleText>}>
          <CardEventsView />
        </Tab>
      </Tabs>
    </div>
  );
};

export { DrawerContentMine };
