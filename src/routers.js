import ContentSearchBook from "./components/ContentSearchBook";
import ContentLogin from "./components/ContentLogin";
import ContentShowMyAppointment from "./components/ContentShowMyAppointment";
import ContentAppointmentManager from "./components/ContentAppointmentManage";
import ContentBookManagement from "./components/ContentBookManagement";
import ContentRegister from "./components/ContentRegister";
import ContentShowMyBorrows from "./components/ContentShowMyBorrow";
const rootPath = process.env.PUBLIC_URL;

const routes = [
  {
    path: `/`,
    component: ContentSearchBook,
    exact: true,
    breadcrumbName: 'Home'
  },
  {
    path: `/login`,
    component: ContentLogin,
    breadcrumbName: 'Login'
  },
  {
    path: `/myappointment`,
    component: ContentShowMyAppointment,
    breadcrumbName: 'My appointments'
  },
  {
    path: `/allAppointments`,
    component: ContentAppointmentManager,
    breadcrumbName: 'All appointments'
  },
  {
    path: `/bookmanagement`,
    component: ContentBookManagement,
    breadcrumbName: 'Books management'
  },
  {
    path: `/register`,
    component: ContentRegister,
    breadcrumbName: 'Register'
  },
  {
    path: `/myborrow`,
    component: ContentShowMyBorrows,
    breadcrumbName: 'My Borrows'
  }
];

export default routes;
export { rootPath };