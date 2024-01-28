import React from "react";

export type ToastType = 'warning' | 'error' | 'success' | 'info';

export type ToastMessage = { type: ToastType; message: string } | null;

export type ToastContextType = {
    showToast: (type: ToastType, message: string) => void;
    hideToast: () => void;
};

export type ToastProviderProps = {
    children: React.ReactNode;
};
