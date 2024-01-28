import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {addDataToLocalStorage, getDataFromLocalStorage} from "@helpers/asyncStorage";
import {AuthContextProps, AuthProviderProps} from "@interfaces/authTypes";

// Define the state and action types
interface AuthState {
    isLoggedIn: boolean;
    token: string;
    role: string;
}

type AuthAction =
    | { type: 'LOGIN'; token: string; role: string }
    | { type: 'LOGOUT' };

const initialState: AuthState = {
    isLoggedIn: false,
    token: '',
    role: '',
};

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isLoggedIn: true,
                token: action.token,
                role: action.role,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    token: '',
    role: '',
    login: () => Promise.resolve(false),
    logout: () => Promise.resolve(),
});

// AuthProvider component
const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (incomingToken: string, incomingRole: string) => {
        try {
            console.log(incomingToken, incomingRole);

            await addDataToLocalStorage('token', incomingToken);
            await addDataToLocalStorage('isLoggedIn', 'true');
            await addDataToLocalStorage('role', incomingRole);

            dispatch({type: 'LOGIN', token: incomingToken, role: incomingRole});
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    const logout = async () => {
        await addDataToLocalStorage('token', '');
        await addDataToLocalStorage('isLoggedIn', 'false');
        await addDataToLocalStorage('role', '');

        dispatch({type: 'LOGOUT'});
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = await getDataFromLocalStorage('token');
            const storedLoggedIn = await getDataFromLocalStorage('isLoggedIn');
            const storedUserRole = await getDataFromLocalStorage('role');

            if (storedToken && storedLoggedIn === 'true' && storedUserRole) {
                dispatch({type: 'LOGIN', token: storedToken, role: storedUserRole});
            }
        };

        initializeAuth().catch((e) => console.error(e));
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn: state.isLoggedIn,
            token: state.token,
            role: state.role,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
const useAuthContext = () => useContext(AuthContext);

export {AuthProvider, useAuthContext};
