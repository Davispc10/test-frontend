import { ReactNode } from "react";
import { RequestProvider } from "./requests";

interface AppProviderProps {
    children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
    return (
        <RequestProvider>
            {children}
        </RequestProvider>
    );
}

export { AppProvider };