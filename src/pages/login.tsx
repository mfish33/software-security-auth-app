import Head from "next/head";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/inputs/Button";
import { TextInput } from "../components/inputs/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";

const loginFormParser = z.object({
  username: z.string(),
  password: z.string(),
});

type LoginSchema = z.infer<typeof loginFormParser>;

export default function Login() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginFormParser) });

  const authContext = useContext(AuthContext)

  const { mutate: loginMutation, error: networkError, isLoading } = api.auth.login.useMutation({
    onSuccess: async (result) => {
      authContext.setAuthState(result)
      await router.push("/main")
    }
  });

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <form
          className="mb-[10rem] flex min-w-[20rem] flex-col gap-4 rounded-xl bg-white/10 p-4 text-white"
          onSubmit={handleSubmit((d) => loginMutation(d))}
        >
          <h1 className="text-xl font-semibold">Login</h1>
          <TextInput
            wrapperClassName="!w-full"
            {...register("username")}
            label="Username"
            error={errors["username"]?.message}
          />
          <TextInput
            wrapperClassName="!w-full"
            {...register("password")}
            label="Password"
            error={errors["password"]?.message}
            type="password"
          ></TextInput>
          <div className="flex flex-col justify-center">
            {!isLoading && <Button className="w-full mb-2">Submit</Button>}
            {isLoading && <ClipLoader color="white" className="m-auto mb-4" size={24}/>}
            <Link className="w-full" href="/register"><Button className="w-full" variant="secondary">Sign Up</Button></Link>
            {networkError && <p className="text-xs text-red-600">{networkError?.message}</p>}
          </div>
        </form>
      </main>
    </>
  );
}
