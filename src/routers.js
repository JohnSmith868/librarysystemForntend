import ContentSearchBook from "./components/ContentSearchBook";
import ContentLogin from "./components/ContentLogin";
const rootPath = process.env.PUBLIC_URL;

const routes = [
  {
    path: `${rootPath}/`,
    component: ContentSearchBook,
    exact: true,
    breadcrumbName: 'Home'
  },
  {
    path: `${rootPath}/login`,
    component: ContentLogin,
    breadcrumbName: 'Login'
  }
];

export default routes;
export { rootPath };