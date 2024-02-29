import React, {createContext, ReactNode, useContext, useState} from 'react';

export type ErrorContextType = {
    isError: boolean;
    errorMessage: string;
    showError: (message: string) => void;
    hideError: () => void;
    getIsError: () => boolean;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

type ErrorProviderProps = {
    children: ReactNode;
};

export const useErrorContext = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useLoadingContext must be used within a LoadingProvider');
    }
    return context;
};

export const ErrorProvider: React.FC<ErrorProviderProps> = ({children}) => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showError = (message: string) => {
        setErrorMessage(message);
        setIsError(true);
    };
    const hideError = () => {
        setIsError(false);
        setErrorMessage('');
    };

    const getIsError = () => isError;

    return (
        <ErrorContext.Provider
            value={{isError, errorMessage, showError, hideError, getIsError}}>
            {children}
        </ErrorContext.Provider>
    );
};
