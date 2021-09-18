import React from "react";
import Layout from "../../componentsAdmin/layout";
import Card from "./card";
import styles from "./style.module.css";
import Advert from "../../assets/Advert.png";

const Advertisement = () => {
  return (
    <Layout heading={"Advertisements"}>
      <div className={styles.grid}>
        <Card
          title={"Header Advertisement"}
          image={Advert}
          type={"612a5e3dbac665751f525908"}
        />
        <Card
          title={"Side Advertisement 1"}
          image={Advert}
          type={"612a5e49bac665751f52590a"}
        />
        <Card
          title={"Side Advertisement 2"}
          image={Advert}
          type={"612a5e4fbac665751f52590c"}
        />
        <Card
          title={"News Advertisement"}
          image={Advert}
          type={"612a5e56bac665751f52590e"}
        />
      </div>
    </Layout>
  );
};


export default Advertisement;
