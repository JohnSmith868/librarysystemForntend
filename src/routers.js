import ContentSearchBook from "./components/ContentSearchBook";
import ContentLogin from "./components/ContentLogin";
import ContentShowMyAppointment from "./components/ContentShowMyAppointment";
import ContentAppointmentManager from "./components/ContentAppointmentManage";
import ContentBookManagement from "./components/ContentBookManagement";
import ContentRegister from "./components/ContentRegister";
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
  },
  {
    path: `${rootPath}/myappointment`,
    component: ContentShowMyAppointment,
    breadcrumbName: 'My appointments'
  },
  {
    path: `${rootPath}/allAppointments`,
    component: ContentAppointmentManager,
    breadcrumbName: 'All appointments'
  },
  {
    path: `${rootPath}/bookmanagement`,
    component: ContentBookManagement,
    breadcrumbName: 'Books management'
  },
  {
    path: `${rootPath}/register`,
    component: ContentRegister,
    breadcrumbName: 'Register'
  }
];

export default routes;
export { rootPath };