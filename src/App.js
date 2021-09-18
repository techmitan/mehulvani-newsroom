import { BrowserRouter, Switch, Route } from "react-router-dom";
import ScrollToTopOnMount from "./scrollTop";

// admin
import Dashboard from "./admin/home";
import AddNews from "./admin/addNews";
import EditNews from "./admin/edit-news";
import ManageCategory from "./admin/category";
import Advertisement from "./admin/advertisement";
import AdvertisementID from "./admin/advertisementID";
import MyNews from "./admin/my-news";
import AllNews from "./admin/all-news";
import Reporters from "./admin/reporters";
import Youtube from "./admin/youtube";
import Poll from "./admin/poll";
import Profile from "./admin/profile";

import Login from "./admin/auth/login";
import Register from "./admin/auth/register";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshAuth } from "./store/auth.slice";

// routes
import AdminRoute from "./routes/adminRoute";
import ReporterRoute from "./routes/reporterRoute";

function App() {
  //refresh-auth
  const refreshingAuth = useSelector((state) => state.auth.refreshingAuth);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(refreshAuth(token));
    }
  }, [dispatch, token]);

  //if token is there in LS, means a user is signed in.
  if (refreshingAuth && token) {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading...
        </div>
      </>
    );
  } else {
    return (
      <BrowserRouter>
        <ScrollToTopOnMount />
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Dashboard /> : <Login />}
          </Route>

          <Route path="/auth/login">
            <Login />
          </Route>

          <Route path="/auth/register">
            <Register />
          </Route>

          <ReporterRoute exact path="/dashboard">
            <Dashboard />
          </ReporterRoute>

          <ReporterRoute path="/dashboard/create-news">
            <AddNews />
          </ReporterRoute>
          <ReporterRoute path="/dashboard/edit-news/:id">
            <EditNews />
          </ReporterRoute>
          <ReporterRoute exact path="/dashboard/my-news">
            <MyNews />
          </ReporterRoute>
          <ReporterRoute exact path="/dashboard/my-profile">
            <Profile />
          </ReporterRoute>

          <AdminRoute path="/dashboard/category">
            <ManageCategory />
          </AdminRoute>
          <AdminRoute path="/dashboard/all-news">
            <AllNews />
          </AdminRoute>
          <AdminRoute path="/dashboard/reporters">
            <Reporters />
          </AdminRoute>
          <AdminRoute exact path="/dashboard/advertisements">
            <Advertisement />
          </AdminRoute>
          <AdminRoute path="/dashboard/advertisements/:id">
            <AdvertisementID />
          </AdminRoute>
          <AdminRoute path="/dashboard/youtube">
            <Youtube />
          </AdminRoute>
          <AdminRoute path="/dashboard/poll">
            <Poll />
          </AdminRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
