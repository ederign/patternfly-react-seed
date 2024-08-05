const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export interface SampleDataRow {
  name: string;
  kind: string;
  image: string;
  config: string;
  status: string;
  //manage
  home: string;
  data: string;
  cpu: string;
  ram: string;
  gpu: string;
  lastActivity: string;
  //connect
}

export const columns = [
  'Name',
  'Kind',
  'Image',
  'Config',
  'Status',
  'Home Vol',
  'Data Vol',
  'CPU',
  'RAM',
  'GPU',
  'Last Activity',
];

export const rows: SampleDataRow[] = [
  {
    name: 'My Jupyter Notebook',
    kind: 'jupyter-lab',
    image: 'jupyter_scipy_170',
    config: 'Small CPU',
    status: ['Stopped', 'Running', 'Down', 'Running (pending restart)'][0],
    home: '/home',
    data: '/data',
    cpu: '43%',
    ram: '1.56GB',
    gpu: 'NVidia XYZ',
    lastActivity: '23 hours ago',
  },
  {
    name: 'Another one',
    kind: 'jupyter-lab',
    image: 'jupyter_scipy_170',
    config: 'Large CPU',
    status: ['Stopped', 'Running', 'Down', 'Running (pending restart)'][1],
    home: '/home',
    data: '/data',
    cpu: '15%',
    ram: '10GB',
    gpu: 'NVidia XYZ',
    lastActivity: '9 hours ago',
  },
  {
    name: 'VS Code Workspace',
    kind: 'vscode-lab',
    image: 'vscode_30',
    config: 'Large CPU',
    status: ['Stopped', 'Running', 'Down', 'Running (pending restart)'][2],
    home: '/home',
    data: '/data',
    cpu: '16%',
    ram: '150MB',
    gpu: 'NVidia XYZ',
    lastActivity: '9 days ago',
  },
  {
    name: 'Another Jupyter',
    kind: 'jupyter-lab',
    image: 'vscode_30',
    config: 'Large CPU',
    status: ['Stopped', 'Running', 'Down', 'Running (pending restart)'][3],
    home: '/home',
    data: '/data',
    cpu: '17%',
    ram: '2GB',
    gpu: 'NVidia XYZ',
    lastActivity: '9 hours ago',
  },
];
