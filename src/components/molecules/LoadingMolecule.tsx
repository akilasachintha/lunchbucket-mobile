import React from 'react';
import {StyleSheet, View} from 'react-native';
import LoaderAtom from '@components/atoms/LoaderAtom';
import TextAtom from '@components/atoms/LoadingTextAtom';
import {THEME} from '@theme/theme';
import {LoadingMoleculeProps} from "@interfaces/loadingTypes";

const LoadingMolecule: React.FC<LoadingMoleculeProps> = ({loadingText}) => {
    return (
        <View style={styles.loading}>
            <LoaderAtom size="large" color={THEME.COLORS.black}/>
            <TextAtom text={loadingText}/>
        </View>
    );
};

const styles = StyleSheet.create({
    loading: {
        width: '30%',
        backgroundColor: THEME.COLORS.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
});

export default LoadingMolecule;
