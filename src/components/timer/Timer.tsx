import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import useFetchRemainingTimes from '../../services/timeService';

interface TimerProps {
    title: string;
    disableTime: boolean;
    isLoading: boolean;
}

const Timer: React.FC<TimerProps> = ({title, disableTime, isLoading}) => {
    const {
        remainingTimeLunch,
        remainingTimeDinner,
    } = useFetchRemainingTimes();

    const renderTimerText = () => {
        const time = title === 'Lunch' ? (disableTime ? '7 PM' : '12:30 PM') : disableTime ? '12:30 PM' : '7 PM';
        return (
            <Text>
                You can{disableTime ? ' not' : ''} place {title} orders until {time}
            </Text>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#630A10"/>
            </View>
        );
    }

    return (
        <View style={styles.timerContainer}>
            <View style={styles.timerBarLeftContainer}>{renderTimerText()}</View>
            <View style={styles.timerBarRightContainer}>
                <Text style={styles.timerRightText}>
                    Time Remaining - {title === 'Lunch' ? remainingTimeLunch : remainingTimeDinner}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    timerBarLeftContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    timerBarRightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    timerLeftText: {
        fontSize: 12,
        paddingRight: '10%',
    },
    timerRightText: {
        fontSize: 12,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    timerRightTextContainer: {}
});

export default Timer;
