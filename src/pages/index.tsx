import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export default function Landing() {
  const authContext = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>Landing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Software <span className="text-[hsl(280,100%,70%)]">Security</span>
          </h1>
          {authContext.isUserAuthenticated() ?
          <Card link="/main" title="Super Secret" message="I guess you are already logged in. Check out the super secret page!"/> :
          <Card link="/login" title="Sign In" message="This is all you can do in this software security app 😔"/>
          }
        </div>
      </main>
    </>
  );
}

type CardProps = {
  title: string;
  message: string;
  link: string;
};
function Card({ title, message, link }: CardProps) {
  return (
    <Link
      className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white transition-all hover:bg-white/20"
      href={link}
    >
      <h3 className="text-2xl font-bold">{title} →</h3>
      <div className="text-lg">{message}</div>
    </Link>
  );
}
