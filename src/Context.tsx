import { createContext, FC, ReactNode } from 'react';

interface AppContextProps {
    cartItems: Record<string, unknown>;
}

const initialState = {
    cartItems: {},
};

export const AppContext = createContext<AppContextProps>(initialState);

export const AppContextProvider: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {

    const contextValue = {
        cartItems: {},
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
};