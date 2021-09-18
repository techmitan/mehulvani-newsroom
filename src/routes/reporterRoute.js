import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

//this is for all logged in users

export default function ReporterRoute(props) {
  const { component: Component, ...rest } = props;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedInUser = useSelector((state) => state.auth.user);
  const refreshingAuth = useSelector((state) => state.auth.refreshingAuth);

  if (refreshingAuth) {
    <div>
      <h1>Loading....</h1>
    </div>;
  }

  if (
    (isLoggedIn && loggedInUser.role === "admin") ||
    loggedInUser.role === "reporter"
  ) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return <Redirect to="/" />;
}
