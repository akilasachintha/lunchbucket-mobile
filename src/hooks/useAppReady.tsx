import {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';

const useAppReady = (): { isAppReady: boolean, onLayoutRootView: () => Promise<void> } => {
    const [isAppReady, setIsAppReady] = useState<boolean>(false);

    const onLayoutRootView = useCallback(async () => {
        if (isAppReady) {
            await SplashScreen.hideAsync();
        }
    }, [isAppReady]);

    useEffect(() => {
        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (e) {
                console.warn(e);
            } finally {
                setIsAppReady(true);
            }
        }

        prepare().catch((e: Error) => console.error(e));
    }, []);

    return {isAppReady, onLayoutRootView};
};

export default useAppReady;
