import React, {createContext, useContext, useState} from 'react';
import {LoadingContextType, LoadingProviderProps, LoadingState} from "@interfaces/loadingTypes";

const defaultLoadingState: LoadingState = {
    isLoading: false,
    text: 'Loading...',
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingContext = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoadingContext must be used within a LoadingProvider');
    }
    return context;
};

export const LoadingProvider: React.FC<LoadingProviderProps> = ({children}) => {
    const [loadingState, setLoadingState] = useState<LoadingState>(defaultLoadingState);

    const showLoading = (text: string = 'Loading...') => setLoadingState({isLoading: true, text});
    const hideLoading = () => setLoadingState({...loadingState, isLoading: false});

    return (
        <LoadingContext.Provider
            value={{loading: loadingState.isLoading, loadingText: loadingState.text, showLoading, hideLoading}}>
            {children}
        </LoadingContext.Provider>
    );
};
