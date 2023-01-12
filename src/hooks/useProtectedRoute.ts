/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";

export function useProtectedRoute() {
    const authContext = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(!authContext.isUserAuthenticated()) {
            router.push("/")
        }
    }, [authContext, router])
}