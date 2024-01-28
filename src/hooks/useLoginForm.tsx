import {ComponentProps, useCallback, useReducer} from "react";
import {TextInput} from "react-native";
import useAuth from "@hooks/useAuth";
import {useLoadingContext} from "@context/LoadingContext";

// Form field interface
interface FormField {
    value: string;
    isFocused: boolean;
    error?: string;
    validator?: (value: string) => string | undefined;
    inputProps?: ComponentProps<typeof TextInput> & { placeholder: string };
}

// Form state interface
interface FormState {
    [field: string]: FormField;
}

// Action types for the form
type FormAction =
    | { type: 'SET_FIELD_VALUE'; field: string; value: string }
    | { type: 'SET_FIELD_ERROR'; field: string; error?: string }
    | { type: 'SET_FIELD_FOCUS'; field: string; isFocused: boolean }
    | { type: 'SUBMIT_REQUEST' }
    | { type: 'SUBMIT_SUCCESS' }
    | { type: 'SUBMIT_FAILURE' };

// Initial state of the form
const initialState: FormState = {
    email: {
        value: '',
        isFocused: false,
        validator: (value) => {
            if (!value) return 'Email is required';
            if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format';
            return undefined;
        },
        inputProps: {
            placeholder: 'Email',
        },
    },
    password: {
        value: '',
        isFocused: false,
        validator: (value) => {
            if (!value) return 'Password is required';
            if (value.length < 6) return 'Password must be at least 6 characters';
            return undefined;
        },
        inputProps: {
            placeholder: 'Password',
            secureTextEntry: true,
        },
    },
    // Add more fields here if necessary
};

// Reducer function for managing form state
const reducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case 'SET_FIELD_VALUE':
            return {
                ...state,
                [action.field]: {...state[action.field], value: action.value},
            };
        case 'SET_FIELD_ERROR':
            return {
                ...state,
                [action.field]: {...state[action.field], error: action.error},
            };
        case 'SET_FIELD_FOCUS':
            return {
                ...state,
                [action.field]: {...state[action.field], isFocused: action.isFocused},
            };
        case 'SUBMIT_REQUEST':
        case 'SUBMIT_SUCCESS':
        case 'SUBMIT_FAILURE':
            return state;
        default:
            return state;
    }
};

// Interface for the useLoginForm hook return type
export interface UseLoginForm {
    formState: FormState;
    handleChange: (field: string, value: string) => void;
    handleFocus: (field: string) => void;
    handleBlur: (field: string) => void;
    handleSubmit: () => void;
    isInvalid: (field: string) => boolean;
    isValid: (field: string) => boolean;
}

// Custom hook for login form logic
export default function useLoginForm(): UseLoginForm {
    const [formState, dispatch] = useReducer(reducer, initialState);
    const {handleLogin} = useAuth();
    const {hideLoading} = useLoadingContext();

    const handleChange = useCallback((field: string, value: string) => {
        dispatch({type: 'SET_FIELD_VALUE', field, value});
        const error = formState[field].validator?.(value);
        dispatch({type: 'SET_FIELD_ERROR', field, error});
    }, [formState]);

    const handleFocus = useCallback((field: string) => {
        dispatch({type: 'SET_FIELD_FOCUS', field, isFocused: true});
    }, []);

    const handleBlur = useCallback((field: string) => {
        dispatch({type: 'SET_FIELD_FOCUS', field, isFocused: false});
    }, []);

    const handleSubmit = useCallback(async () => {
        let isValid = true;
        for (const field in formState) {
            const error = formState[field].validator?.(formState[field].value);
            if (error) {
                dispatch({type: 'SET_FIELD_ERROR', field, error});
                isValid = false;
            }
        }

        if (isValid) {
            dispatch({type: 'SUBMIT_REQUEST'});
            console.log('Form submission:', formState);
            const response = await handleLogin(formState.email.value, formState.password.value);
            if (response) {
                dispatch({type: 'SUBMIT_SUCCESS'});
                hideLoading();
            } else {
                dispatch({type: 'SUBMIT_FAILURE'});
            }
        }
    }, [formState, handleLogin, hideLoading]);

    const isInvalid = useCallback((field: string) => !!formState[field].error, [formState]);
    const isValid = useCallback((field: string) => !formState[field].error && !!formState[field].value, [formState]);

    return {
        formState,
        handleChange,
        handleFocus,
        handleBlur,
        handleSubmit,
        isInvalid,
        isValid,
    };
}
