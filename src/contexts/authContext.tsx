import { type ReactNode, useState, createContext } from "react";

const AuthContext = createContext({
  token: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAuthState: (token: string) => undefined as void,
  isUserAuthenticated: () => false as boolean,
  signOut: () => undefined as void
});
const { Provider } = AuthContext;

const AuthProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");

  const setUserAuthInfo = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const signOut = () => {
    setToken("")
  }

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!token) {
      return false;
    }
    return true
  };

  return (
    <Provider
      value={{
        token,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
        signOut
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
