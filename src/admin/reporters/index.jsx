import React from "react";
import Layout from "../../componentsAdmin/layout";

import { useState, useEffect } from "react";
import { baseAPI } from "../../config";
import Table from "./newsTable";

const Reporters = () => {
  const [users, setUsers] = useState([]);
  const [getUsers, setGetUsers] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${baseAPI}/api/user/get-all`);
      const data = await response.json();
      setUsers(data.users);
    };
    getUsers();
  }, [getUsers]);

  return (
    <Layout heading={"Reporters"}>
      <Table data={users} getUsers={getUsers} setGetUsers={setGetUsers} />
    </Layout>
  );
};

export default Reporters;
