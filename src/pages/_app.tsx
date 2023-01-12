import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import { AuthProvider } from "../contexts/authContext";
import dynamic from "next/dynamic";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default dynamic(() => Promise.resolve(api.withTRPC(MyApp)), {
  ssr: false,
});
