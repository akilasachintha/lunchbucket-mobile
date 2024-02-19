import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {addDataToLocalStorage} from '../storage/asyncStorage';
import {log} from '../logs/log';
import {validateTokenService} from '../../services/authService';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({children}) => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                if (await isValidToken()) {
                    await addDataToLocalStorage('loginStatus', 'true');
                } else {
                    await addDataToLocalStorage('loginStatus', 'false');

                    navigation.reset({
                        index: 0,
                        // @ts-ignore
                        routes: [{name: 'Initial'}],
                    });
                }
            } catch (error: any) {
                log('error', 'AuthGuard.js', 'checkAuthToken', error.message, 'AuthGuard.js');
                await addDataToLocalStorage('loginStatus', 'false');
                navigation.reset({
                    index: 0,
                    // @ts-ignore
                    routes: [{name: 'Initial'}],
                });
            }
        };

        checkAuthToken().catch((error) => {
            log('error', 'AuthGuard.js', 'checkAuthToken', error.message, 'AuthGuard.js');
            navigation.reset({
                index: 0,
                // @ts-ignore
                routes: [{name: 'Initial'}],
            });
        });
    }, []);

    const isValidToken = async () => {
        return await validateTokenService();
    };

    return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
