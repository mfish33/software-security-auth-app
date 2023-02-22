import Head from "next/head";
import { useContext } from "react";
import { ContactsTable } from "../components/contactsTable";
import { Button } from "../components/inputs/Button";
import { AuthContext } from "../contexts/authContext";
import { useProtectedRoute } from "../hooks/useProtectedRoute";

export default function MainPage() {
  useProtectedRoute();

  const authContext = useContext(AuthContext);
  const user = authContext.getUser();

  return (
    <>
      <Head>
        <title>Main</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center px-4 py-16 text-white">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Welcome{" "}
            <span className="text-[hsl(280,100%,70%)]">{user?.username}</span>
          </h1>
          <p className="mt-12 text-lg">You did the things 🎉</p>
          <Button
            type="button"
            onClick={authContext.signOut}
            className="mt-2 w-36"
          >
            Sign Out
          </Button>
          <ContactsTable/>
        </div>
      </main>
    </>
  );
}
