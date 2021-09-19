import React from "react";
import Layout from "../../componentsAdmin/layout";
import { useSelector } from "react-redux";

const Dashboard = () => {
  let user = useSelector((state) => state.auth.user);
  return (
    <Layout>
      <h1>Hello, {user.full_name}</h1>
      <h2>Welcome to mehulvani newsroom!</h2>
    </Layout>
  );
};

export default Dashboard;
