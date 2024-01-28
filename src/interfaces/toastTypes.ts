import React from "react";
import {TOAST_TYPES} from "@constants/constants";

export type ToastTextAtomProps = {
    message: string;
}

export type ToastType = typeof TOAST_TYPES[keyof typeof TOAST_TYPES];

export type ToastMessage = {
    type: typeof TOAST_TYPES[keyof typeof TOAST_TYPES];
    message: string;
}

export type ToastContextType = {
    showToast: (type: ToastType, message: string) => void;
    hideToast: () => void;
};

export type ToastProviderProps = {
    children: React.ReactNode;
};

export type ToastProps = {
    type: ToastType;
    message: string;
}
