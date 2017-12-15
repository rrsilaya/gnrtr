import Feature1 from '../features/feature1/Feature1';

const router = [
  {
    path: '/',
    exact: true,
    component: Feature1,
    type: 'route'
  },
  {
    to: '/',
    type: 'redirect'
  }
];

export default router;