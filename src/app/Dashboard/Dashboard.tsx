import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { TableColumnManagement } from './Table';
import { WizardInModalDemo } from './WizardInModalDemo';

const Dashboard: React.FunctionComponent = () => (
  <>
    <TableColumnManagement />
    {/* <WizardInModalDemo /> */}
  </>
);

export { Dashboard };
