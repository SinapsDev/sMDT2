import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import policeLogo from "../assets/police-logo.png";

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
      </div>
      <div className={styles.rightContainer}></div>
    </div>
  );
};

// export const getServerSideProps = async () => {

//   return {
//     props: {
//       users: data
//     },
//  };
// }

export default Home;
