import React from "react";

export type AuthContextProps = {
    isLoggedIn: boolean;
    token: string | null;
    role: string | null;
    login: (incomingToken: string, incomingRole: string) => Promise<boolean>;
    logout: () => void;
}

export type AuthProviderProps = {
    children: React.ReactNode;
}
