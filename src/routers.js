import ContentSearchBook from "./components/ContentSearchBook";
const rootPath = process.env.PUBLIC_URL;

const routes = [
  {
    path: `${rootPath}/`,
    component: ContentSearchBook,
    exact: true,
    breadcrumbName: 'Home'
  }
];

export default routes;
export { rootPath };