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
import { ConfirmPassword } from "../components/inputs/ConfirmPassword";
import { checkPassword } from "../utils/shared_utils";
import Link from "next/link";

const loginFormParser = z.object({
  username: z.string(),
  password: z.string(),
});

type LoginSchema = z.infer<typeof loginFormParser>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginFormParser) });

  const authContext = useContext(AuthContext);

  const password = watch("password") ?? ""
  const username = watch("username") ?? ""


  const {
    mutate: registerMutation,
    error: networkError,
    isLoading,
  } = api.auth.register.useMutation({
    onSuccess: async (result) => {
      authContext.setAuthState(result);
      await router.push("/main");
    },
  });

  return (
    <>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <form
          className="mb-[10rem] flex min-w-[20rem] flex-col gap-4 rounded-xl bg-white/10 p-4 text-white"
          onSubmit={handleSubmit((d) => registerMutation(d))}
        >
          <h1 className="text-xl font-semibold">Register</h1>
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
          <ConfirmPassword className="text-sm" password={password}/>
          <div className="flex flex-col items-center">
            {!isLoading && <Button className="w-full mb-2 transition-all" disabled={!(username && checkPassword(password).fullyValidated)}>Submit</Button>}
            {isLoading && <ClipLoader color="white" className="m-auto mb-4" size={24}/>}
            <Link className="w-full" href="/login"><Button className="w-full" variant="secondary">Sign In</Button></Link>
            {networkError && <p className="text-xs text-red-600">{networkError?.message}</p>}
          </div>
        </form>
      </main>
    </>
  );
}
