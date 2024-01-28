import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useLoadingContext} from '@context/LoadingContext';
import LoadingMolecule from '@components/molecules/LoadingMolecule';

const LoadingScreen: React.FC = () => {
    const {loading, loadingText} = useLoadingContext();

    if (!loading) return null;

    return (
        <View style={styles.container}>
            <LoadingMolecule loadingText={loadingText}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
});

export default LoadingScreen;
