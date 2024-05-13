import BooksPage from "../components/Pages/BooksPage";
import HandleReturnsPage from "../components/Pages/HandleReturnsPage";
import HomeComponent from "../components/Pages/Home";
import IssueBooksPage from "../components/Pages/IssueBooksPage";
import Members from "../components/Pages/Members";
import MainLayout from "../components/layouts/MainLayout";

const routes = [
  {
    path: "/",
    Component: HomeComponent,
    Layout: MainLayout,
  },
  {
    path: "/members",
    Component: Members,
    Layout: MainLayout,
  },
  {
    path: "/books",
    Component: BooksPage,
    Layout: MainLayout,
  },
  {
    path: "/issueBooks",
    Component: IssueBooksPage,
    Layout: MainLayout,
  },
  {
    path: "/returnBooks",
    Component: HandleReturnsPage,
    Layout: MainLayout,
  },
];

export default routes;
