import {ReactNode} from "react";

export type LoaderAtomProps = {
    size: number | 'small' | 'large';
    color: string;
}

export type LoadingTextAtomProps = {
    text: string;
}

export type LoadingMoleculeProps = {
    loadingText: string;
}

export type LoadingContextType = {
    loading: boolean;
    loadingText: string;
    showLoading: (text?: string) => void;
    hideLoading: () => void;
}

export type LoadingProviderProps = {
    children: ReactNode;
}

export type LoadingState = {
    isLoading: boolean;
    text: string;
}