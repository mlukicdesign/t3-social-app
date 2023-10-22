import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";


import { api } from "~/utils/api"; 
import SideNav from "~/components/SideNav";

import Head from "next/head";


import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>T3 Social App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <meta name="description" content="A social media app created with the T3 stack"></meta>
      <div className="container mx-auto flex">
      <SideNav />
      <div className="min-h-screen flex-grow border-x">

      </div>
      <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
