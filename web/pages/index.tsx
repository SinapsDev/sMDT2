import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import policeLogo from "../assets/police-logo.png";
import Input from "../components/Input/input";
import Button from "../components/Button/button";

const Home: NextPage = ({ users }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Police MDT</title>
        <meta name="description" content="Police MDT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.leftContainer}>
        <div className={styles.policeLogo}>
          <Image src={policeLogo} alt="Police Logo" />
        </div>
        <h1 className={styles.leftText}>Los Santos Police Departement</h1>
        <div className={styles.bottomText}>Los Santos Dev Center © 2022</div>
      </div>
      <div className={styles.rightContainer}>
        <h1 className={styles.rightText}>
          Welcome to Los Santos Police Departement MDT
        </h1>
        <p className={styles.loginText}>
          Please login with your identifier and password:
        </p>
        <div className={styles.inputsContainer}>
          <Input placeholder="Identifier" width="50%" height="50px" />
          <Input placeholder="Password" width="50%" height="50px" />
        </div>
        <div className={styles.loginButton}>
          <Button
            text="CONNECT"
            color="rgb(173, 173, 173)"
            backgroundColor="rgb(0, 0, 34)"
            center={true}
            height="60px"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
