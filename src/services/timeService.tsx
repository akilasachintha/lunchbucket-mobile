import {AxiosResponse} from 'axios';
import moment, {Moment} from 'moment';
import {useEffect, useState} from 'react';
import {lunchBucketAPI} from '../apis/lunchBucketAPI';

interface FetchRemainingTimesResponse {
    data?: any;
}

interface FetchRemainingTimesResult {
    remainingTimeLunch: string;
    remainingTimeDinner: string;
    getUTCDateTime: () => Promise<FetchRemainingTimesResponse | null>;
}

const useFetchRemainingTimes = (): FetchRemainingTimesResult => {
    const [remainingTimeLunch, setRemainingTimeLunch] = useState('00:00:00');
    const [remainingTimeDinner, setRemainingTimeDinner] = useState('00:00:00');

    const getUTCDateTime = async (): Promise<any> => {
        try {
            const response: AxiosResponse<FetchRemainingTimesResponse> = await lunchBucketAPI.get('getUtcTime');
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log('Error fetching UTC time:', error);
            return null;
        }
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const fetchRemainingTimes = async () => {
            const response = await getUTCDateTime();
            if (!response) {
                setRemainingTimeLunch('Error');
                setRemainingTimeDinner('Error');
                return;
            }

            const updateRemainingTime = () => {
                const currentTime: Moment = moment.utc();
                const lunchTimeEnd: Moment = moment.utc().set({hour: 13, minute: 30, second: 0});
                const dinnerTimeStart: Moment = moment.utc().set({hour: 7, minute: 0, second: 0});

                let remainingTime: number;
                if (currentTime.isBefore(dinnerTimeStart)) {
                    remainingTime = dinnerTimeStart.diff(currentTime);
                } else if (currentTime.isBefore(lunchTimeEnd)) {
                    remainingTime = lunchTimeEnd.diff(currentTime);
                } else {
                    const nextDinnerTimeStart: Moment = dinnerTimeStart.add(1, 'days');
                    remainingTime = nextDinnerTimeStart.diff(currentTime);
                }

                setRemainingTimeLunch(formatTimeDifference(remainingTime));
                setRemainingTimeDinner(formatTimeDifference(remainingTime));
            };

            intervalId = setInterval(updateRemainingTime, 1000);
        };

        fetchRemainingTimes().catch(console.error);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const formatTimeDifference = (difference: number): string => {
        if (difference <= 0) {
            return '00:00:00';
        } else {
            const hours: number = Math.floor(difference / 3600000);
            const minutes: number = Math.floor((difference % 3600000) / 60000);
            const seconds: number = Math.floor((difference % 60000) / 1000);
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    };

    return {remainingTimeLunch, remainingTimeDinner, getUTCDateTime};
};

export default useFetchRemainingTimes;
