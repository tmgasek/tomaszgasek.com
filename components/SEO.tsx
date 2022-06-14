import Head from "next/head";

const SEO = ({ title }: any) => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{title || "Tomasz Gasek - Homepage"}</title>
    </Head>
  );
};

export default SEO;
