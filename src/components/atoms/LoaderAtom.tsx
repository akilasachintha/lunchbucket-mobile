import React from 'react';
import {ActivityIndicator} from 'react-native';
import {LoaderAtomProps} from "@interfaces/loadingTypes";

const LoaderAtom: React.FC<LoaderAtomProps> = ({size, color}) => {
    return <ActivityIndicator size={size} color={color}/>;
};

export default LoaderAtom;
