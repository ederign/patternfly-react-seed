import React from 'react';
import {
  ActionGroup,
  Button,
  Checkbox,
  Form,
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  Popover,
  Radio,
  TextArea,
  TextInput,
} from '@patternfly/react-core';

import {
  Button,
  Card,
  DataList,
  DataListCell,
  DataListCheck,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Label,
  MenuToggle,
  Modal,
  OverflowMenu,
  OverflowMenuGroup,
  OverflowMenuItem,
  PageSection,
  Pagination,
  PaginationVariant,
  Text,
  TextContent,
  TextInputGroup,
  TextVariants,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import { ExpandableRowContent, Table, TableText, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import SortAmountDownIcon from '@patternfly/react-icons/dist/esm/icons/sort-amount-down-icon';
import { DashboardWrapper } from '@patternfly/react-table/dist/esm/demos/DashboardWrapper';
import { capitalize } from '@patternfly/react-table/src/components/Table/utils/utils';
import { SampleDataRow } from '@patternfly/react-table/dist/esm/demos/sampleData';
import { Header } from './Header';
import { SearchInput } from '@patternfly/react-core';
import { columns, rows } from './myData';
import { Icon } from '@patternfly/react-core';
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon';
import { PlayCircleIcon, StopIcon } from '@patternfly/react-icons';
import { WizardInModalDemo } from './WizardInModalDemo';
import { Button, Modal, ModalVariant } from '@patternfly/react-core';

import {
  Card,
  CardBody,
  Gallery,
  GalleryItem,
  Modal,
  ModalVariant,
  PageSection,
  Wizard,
  WizardHeader,
  WizardStep,
} from '@patternfly/react-core';
import { CardViewBasic } from './KindCard';

interface TableColumnManagementProps {
  onClick: () => void; // or specify more detailed function type if needed
}

export const TableColumnManagement: React.FunctionComponent<TableColumnManagementProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const defaultColumns = columns;
  const defaultRows = rows;

  const [filters, setFilters] = React.useState<string[]>([]);

  const [filteredColumns, setFilteredColumns] = React.useState<string[]>([]);
  const [filteredRows, setFilteredRows] = React.useState<SampleDataRow[]>([]);
  const [managedColumns, setManagedColumns] = React.useState<string[]>(defaultColumns);
  const [managedRows, setManagedRows] = React.useState<SampleDataRow[]>(defaultRows);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [checkedState, setCheckedState] = React.useState<boolean[]>(Array(columns.length).fill(true));
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [paginatedRows, setPaginatedRows] = React.useState<any[]>(rows);

  const matchCheckboxNameToColumn = (name: string): string => {
    switch (name) {
      case 'check1':
        return 'Nome';
      case 'check2':
        return 'Threads';
      case 'check3':
        return 'Applications';
      case 'check4':
        return 'Workspaces';
      case 'check5':
        return 'Status';
      case 'check6':
        return 'Location';
      case 'check7':
        return 'Last Modified';
      case 'check8':
        return 'URL';
      default:
        return '';
    }
  };

  const matchSelectedColumnNameToAttr = (name: string): string => {
    switch (name) {
      case 'Nome':
        return 'name';
      case 'Threads':
        return 'threads';
      case 'Applications':
        return 'applications';
      case 'Workspaces':
        return 'workspaces';
      case 'Status':
        return 'status';
      case 'Location':
        return 'location';
      case 'Last Modified':
        return 'lastModified';
      case 'URL':
        return 'url';
      default:
        return '';
    }
  };

  // Pagination logic
  const handleSetPage = (
    _evt: MouseEvent | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handlePerPageSelect = (
    _evt: MouseEvent | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    newPerPage: number,
  ) => {
    setPerPage(newPerPage);
  };

  const renderPagination = (variant: 'top' | 'bottom' | PaginationVariant, isCompact: boolean) => (
    <Pagination
      isCompact={isCompact}
      itemCount={rows.length}
      page={page}
      perPage={perPage}
      onSetPage={handleSetPage}
      onPerPageSelect={handlePerPageSelect}
      variant={variant}
      titles={{
        paginationAriaLabel: `${variant} pagination`,
      }}
    />
  );

  React.useEffect(() => {
    setPaginatedRows(managedRows.slice((page - 1) * perPage, page * perPage - 1));
  }, [managedRows, page, perPage]);

  // Removes attribute from each node object in Data.jsx
  const removePropFromObject = (object: any, keys: string[]): any =>
    keys.reduce((obj, prop) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [prop]: _, ...keep } = obj;
      return keep;
    }, object);

  // Filters columns out of table that are not selected in the column management modal
  const filterData = (checked: boolean, name: string) => {
    const selectedColumn = matchSelectedColumnNameToAttr(name);

    const filteredRows: SampleDataRow[] = [];
    if (checked) {
      const updatedFilters = filters.filter((item) => item !== selectedColumn);

      // Only show the names of columns that were selected in the modal
      const filteredColumns = defaultColumns.filter(
        (column) => !updatedFilters.includes(matchSelectedColumnNameToAttr(column)),
      );

      // Remove the attributes (i.e. "columns") that were not selected
      defaultRows.forEach((item) => filteredRows.push(removePropFromObject(item, updatedFilters)));

      setFilters(updatedFilters);
      setFilteredColumns(filteredColumns);
      setFilteredRows(filteredRows);
    } else {
      const updatedFilters = filters;
      updatedFilters.push(selectedColumn);

      // Only show the names of columns that were selected in the modal
      const filteredColumns = managedColumns.filter(
        (column) => !filters.includes(matchSelectedColumnNameToAttr(column)),
      );

      // Remove the attributes (i.e. "columns") that were not selected
      managedRows.forEach((item) => filteredRows.push(removePropFromObject(item, updatedFilters)));

      setFilters(updatedFilters);
      setFilteredColumns(filteredColumns);
      setFilteredRows(filteredRows);
    }
  };

  const unfilterAllData = () => {
    setFilters([]);
    setFilteredColumns(defaultColumns);
    setFilteredRows(defaultRows);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    // Remove any columns from the table that aren't checked
    filterData(checked, matchCheckboxNameToColumn(target.name));
    const checkedIndex: number = columns.findIndex((element) => element === matchCheckboxNameToColumn(target.name));

    const updatedCheckedState: boolean[] = [...checkedState];
    updatedCheckedState[checkedIndex] = value as boolean;
    setCheckedState(updatedCheckedState);
  };

  const handleModalToggle = (_event: React.MouseEvent<Element, MouseEvent> | KeyboardEvent) => {
    setIsModalOpen(!isModalOpen);
  };

  const onSave = () => {
    setManagedColumns(filteredColumns);
    setManagedRows(filteredRows);
    setPaginatedRows(filteredRows);
    setIsModalOpen(!isModalOpen);
  };

  const selectAllColumns = () => {
    unfilterAllData();
    setCheckedState(Array(columns.length).fill(true));
  };

  const renderModal = () => (
    <Modal
      title="Manage columns"
      variant="small"
      description={
        <TextContent>
          <Text component={TextVariants.p}>Selected categories will be displayed in the table.</Text>
          <Button isInline onClick={selectAllColumns} variant="link">
            Select all
          </Button>
        </TextContent>
      }
      actions={[
        <Button key="save" variant="primary" onClick={onSave}>
          Save
        </Button>,
        <Button key="cancel" variant="secondary" onClick={handleModalToggle}>
          Cancel
        </Button>,
      ]}
    >
      <DataList aria-label="Table column management" id="table-column-management" isCompact>
        <DataListItem aria-labelledby="table-column-management-item1">
          <DataListItemRow>
            <DataListCheck
              aria-labelledby="table-column-management-item1"
              checked={checkedState[0]}
              name="check1"
              id="check1"
              onChange={handleChange}
            />
            <DataListItemCells
              dataListCells={[
                <DataListCell id="table-column-management-item1" key="table-column-management-item1">
                  <label htmlFor="check1">{columns[0]}</label>
                </DataListCell>,
              ]}
            />
          </DataListItemRow>
        </DataListItem>
        <DataListItem aria-labelledby="table-column-management-item2">
          <DataListItemRow>
            <DataListCheck
              aria-labelledby="table-column-management-item2"
              checked={checkedState[1]}
              name="check2"
              id="check2"
              onChange={handleChange}
            />
            <DataListItemCells
              dataListCells={[
                <DataListCell id="table-column-management-item2" key="table-column-management-item2">
                  <label htmlFor="check2">{columns[1]}</label>
                </DataListCell>,
              ]}
            />
          </DataListItemRow>
        </DataListItem>
        <DataListItem aria-labelledby="table-column-management-item3">
          <DataListItemRow>
            <DataListCheck
              aria-labelledby="table-column-management-item3"
              checked={checkedState[2]}
              name="check3"
              id="check3"
              onChange={handleChange}
            />
            <DataListItemCells
              dataListCells={[
                <DataListCell id="table-column-management-item3" key="table-column-management-item3">
                  <label htmlFor="check3">{columns[2]}</label>
                </DataListCell>,
              ]}
            />
          </DataListItemRow>
        </DataListItem>
        <DataListItem aria-labelledby="table-column-management-item4">
          <DataListItemRow>
            <DataListCheck
              aria-labelledby="table-column-management-item4"
              checked={checkedState[3]}
              name="check4"
              id="check4"
              onChange={handleChange}
            />
            <DataListItemCells
              dataListCells={[
                <DataListCell id="table-column-management-item4" key="table-column-management-item4">
                  <label htmlFor="check4">{columns[3]}</label>
                </DataListCell>,
              ]}
            />
          </DataListItemRow>
        </DataListItem>
        <DataListItem aria-labelledby="table-column-management-item4">
          <DataListItemRow>
            <DataListCheck
              aria-labelledby="table-column-management-item4"
              checked={checkedState[4]}
              name="check5"
              id="check5"
              onChange={handleChange}
            />
            <DataListItemCells
              dataListCells={[
                <DataListCell id="table-column-management-item4" key="table-column-management-item4">
                  <label htmlFor="check5">{columns[4]}</label>
                </DataListCell>,
              ]}
            />
          </DataListItemRow>
        </DataListItem>
        <DataListItem aria-labelledby="table-column-management-item5">
          <DataListItemRow>
            <DataListCheck
              aria-labelledby="table-column-management-item5"
              checked={checkedState[5]}
              name="check6"
              id="check6"
              onChange={handleChange}
            />
            <DataListItemCells
              dataListCells={[
                <DataListCell id="table-column-management-item5" key="table-column-management-item5">
                  <label htmlFor="check6">{columns[5]}</label>
                </DataListCell>,
              ]}
            />
          </DataListItemRow>
        </DataListItem>
        <DataListItem aria-labelledby="table-column-management-item6">
          <DataListItemRow>
            <DataListCheck
              aria-labelledby="table-column-management-item6"
              checked={checkedState[6]}
              name="check7"
              id="check7"
              onChange={handleChange}
            />
            <DataListItemCells
              dataListCells={[
                <DataListCell id="table-column-management-item6" key="table-column-management-item5">
                  <label htmlFor="check7">{columns[6]}</label>
                </DataListCell>,
              ]}
            />
          </DataListItemRow>
        </DataListItem>
        <DataListItem aria-labelledby="table-column-management-item5">
          <DataListItemRow>
            <DataListCheck
              aria-labelledby="table-column-management-item5"
              checked={checkedState[7]}
              name="check8"
              id="check8"
              onChange={handleChange}
            />
            <DataListItemCells
              dataListCells={[
                <DataListCell id="table-column-management-item7" key="table-column-management-item7">
                  <label htmlFor="check8">{columns[7]}</label>
                </DataListCell>,
              ]}
            />
          </DataListItemRow>
        </DataListItem>
      </DataList>
    </Modal>
  );

  const renderLabel = (labelText: string): JSX.Element => {
    switch (labelText) {
      case 'Running':
        return <Label color="green">{labelText}</Label>;
      case 'Stopped':
        return <Label color="orange">{labelText}</Label>;
      case 'Running (pending restart)':
        return <Label color="blue">{labelText}</Label>;
      case 'Down':
        return <Label color="red">{labelText}</Label>;
      default:
        return <></>;
    }
  };

  const toolbarItems = (
    <React.Fragment>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        variant={ModalVariant.large}
        showClose={false}
        hasNoBodyWrapper
        aria-describedby="wiz-modal-demo-description"
        aria-labelledby="wiz-modal-demo-title"
      >
        <Wizard
          header={
            <WizardHeader
              title="Wizard in modal"
              titleId="wiz-modal-demo-title"
              description="Simple wizard description"
              descriptionId="wiz-modal-demo-description"
              closeButtonAriaLabel="Close wizard"
            />
          }
          height={400}
          onClose={handleModalToggle}
        >
          <WizardStep
            name="Workspace"
            id="wizard-step-1"
            steps={[
              <WizardStep name="Description" id="wizard-step-1a" key="wizard-step-1a">
                <Form>
                  <FormGroup label="Name">
                    <TextInput
                      isRequired={true}
                      type="text"
                      id="simple-form-name-01"
                      name="simple-form-name-01"
                      aria-describedby="simple-form-name-01-helper"
                      value=""
                    />
                    <FormHelperText>
                      <HelperText>
                        <HelperTextItem>Some help if necessary.</HelperTextItem>
                      </HelperText>
                    </FormHelperText>
                  </FormGroup>
                  <FormGroup label="NameSpace">
                    <TextInput
                      isRequired={true}
                      isDisabled={true}
                      type="text"
                      id="simple-form-name-01"
                      name="simple-form-name-01"
                      aria-describedby="simple-form-name-01-helper"
                      value="user-namespace"
                    />
                  </FormGroup>
                  <FormGroup label="Description">
                    <TextArea
                      isRequired={true}
                      type="text"
                      id="simple-form-name-01"
                      name="simple-form-name-01"
                      aria-describedby="simple-form-name-01-helper"
                      value=""
                    />
                  </FormGroup>
                </Form>
              </WizardStep>,
              <WizardStep name="Kind" id="wizard-step-1b" key="wizard-step-1b">
                <CardViewBasic />
              </WizardStep>,
              <WizardStep name="Kind Options" id="wizard-step-1c" key="wizard-step-1c">
                <p>
                  Similar for the "image options" which will appear on the next page (but probably as a a table, rather
                  than card view, because they dont have an SVG). The "image option" The "pod config option" (which
                  defines the "small gpu" thing
                </p>
              </WizardStep>,
            ]}
          />
          <WizardStep
            name="Configuration"
            id="wizard-step-2"
            steps={[
              <WizardStep name="Substep A" id="wizard-step-2a" key="wizard-step-2a">
                <p>Configuration substep A</p>
              </WizardStep>,
              <WizardStep name="Substep B" id="wizard-step-2b" key="wizard-step-2b">
                <p>Configuration substep B</p>
              </WizardStep>,
            ]}
          />
          <WizardStep name="Additional" id="wizard-step-3">
            <p>Step 3 content</p>
          </WizardStep>
          <WizardStep
            name="Review"
            id="wizard-step-4"
            footer={{
              nextButtonText: 'Finish',
              onNext: () => {
                setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
              },
            }}
          >
            <p>Review step content</p>
          </WizardStep>
        </Wizard>
      </Modal>

      <Header />
      <Toolbar id="page-layout-table-column-management-action-toolbar-top">
        <span id="page-layout-table-column-management-action-toolbar-top-select-checkbox-label" hidden>
          Choose one
        </span>
        <ToolbarContent>
          <ToolbarItem variant="overflow-menu">
            <OverflowMenu breakpoint="md">
              <OverflowMenuItem>
                <MenuToggle>
                  <FilterIcon /> Name
                </MenuToggle>
              </OverflowMenuItem>
              <OverflowMenuItem>
                <MenuToggle variant="plain" aria-label="Sort columns">
                  <SortAmountDownIcon aria-hidden="true" />
                </MenuToggle>
              </OverflowMenuItem>
              <OverflowMenuGroup groupType="button" isPersistent>
                <OverflowMenuItem>
                  <SearchInput placeholder="Find by name" value="" />
                </OverflowMenuItem>
                <OverflowMenuItem isPersistent>
                  <Button onClick={handleModalToggle} variant="primary">
                    Create Workspace
                  </Button>
                </OverflowMenuItem>
                <OverflowMenuItem isPersistent>
                  <Button variant="danger">Delete</Button>
                </OverflowMenuItem>
              </OverflowMenuGroup>
            </OverflowMenu>
          </ToolbarItem>
          <ToolbarItem variant="pagination">{renderPagination('top', false)}</ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <WizardInModalDemo />
      <PageSection isFilled>
        <Card>
          {toolbarItems}
          <Table variant="compact" aria-label="Column Management Table">
            <Thead>
              <Tr>
                <Th
                  select={{
                    isSelected: false,
                  }}
                />
                {managedColumns.map((column, columnIndex) => (
                  <Th sort={true} key={columnIndex}>
                    {column}
                  </Th>
                ))}
                <Th>Manage</Th>
                <Th width={15}>Connect</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedRows.map((row, rowIndex) => (
                <Tr isExpanded={true} key={rowIndex}>
                  <>
                    <Td
                      select={{
                        isSelected: false,
                      }}
                    ></Td>

                    {Object.entries(row).map(([key, value]) =>
                      // eslint-disable-next-line no-nested-ternary
                      key === 'status' ? (
                        // eslint-disable-next-line react/jsx-key
                        <Td width={15} dataLabel="Status">
                          {renderLabel(value as string)}
                        </Td>
                      ) : key === 'ram' ? (
                        <Td width={5} dataLabel="RAM" modifier="truncate">
                          <TableText>
                            <a href="#">{row.ram}</a>
                          </TableText>
                        </Td>
                      ) : key === 'ram' ? (
                        <Td width={5} dataLabel="RAM" modifier="truncate">
                          <TableText>
                            <a href="#">{row.ram}</a>
                          </TableText>
                        </Td>
                      ) : key === 'cpu' ? (
                        <Td width={5} dataLabel="CPU" modifier="truncate">
                          <TableText>
                            <a href="#">{row.cpu}</a>
                          </TableText>
                        </Td>
                      ) : key === 'url' ? (
                        <Td width={10} dataLabel="URL" modifier="truncate">
                          <TableText>
                            <a href="#">{row.url}</a>
                          </TableText>
                        </Td>
                      ) : (
                        <Td
                          modifier="truncate"
                          width={key === 'name' ? 20 : 10}
                          dataLabel={key === 'lastModified' ? 'Last modified' : capitalize(key)}
                          onClick={props.onClick}
                        >
                          {value as string}
                        </Td>
                      ),
                    )}
                    <Td>
                      <Icon size="xl" iconSize="md">
                        <PlayCircleIcon />
                      </Icon>
                    </Td>
                    <Td>
                      <a>Connect</a>
                    </Td>
                    <Td>
                      <a>Edit</a>
                    </Td>
                  </>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {renderPagination('bottom', false)}
          {renderModal()}
        </Card>
      </PageSection>
    </React.Fragment>
  );
};
