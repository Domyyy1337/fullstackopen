import { createContext } from "react";
import type AuthStorage from "../utils/authStorage";

const AuthStorageContext = createContext<AuthStorage | undefined>(undefined)

export default AuthStorageContext