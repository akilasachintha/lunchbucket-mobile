import React from 'react';
import {Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DynamicTopBar from "../components/topBar/DynamicTopBar";
import TopHeader from "../components/topHeader/TopHeader";
import {SelectedTab} from "../helpers/enums/enums";
import PATHS from "../helpers/paths/paths";

export default function AboutUsScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="About Us" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollViewStyle}>
                    <View style={styles.contentContainer}>
                        <Image source={PATHS.background} style={{width: '100%', height: 200}}/>
                        <Text style={styles.titleText}>Team Lunchbucket</Text>
                        <Text style={styles.bodyText}>
                            🚀 Empowered Team: Meet our dynamic team at Lunch Bucket, a powerhouse of potential and
                            creativity.
                        </Text>
                        <Text style={styles.bodyText}>
                            🍏 Health Safeguard: Our mission is to secure the health of students, redefining how they
                            nourish their bodies.
                        </Text>
                        <Text style={styles.bodyText}>
                            🌐 Cleanliness Assurance: At Lunch Bucket, cleanliness is our priority in meal preparation.
                            We adhere to the highest standards to ensure your well-being is served alongside every
                            delicious meal.
                        </Text>
                        <Text style={styles.bodyText}>
                            💡 Tech-Infused Creativity: Through a creative and tech-integrated solution, we're
                            transforming the dining experience for a healthier, happier student life.
                        </Text>
                        <Text style={styles.bodyText}>
                            Welcome to Lunch Bucket – where innovation meets well-being.
                        </Text>
                        <ImageBackground source={PATHS.motivation}
                                         style={{width: '100%', height: 200, marginBottom: 50, marginTop: 40}}>
                            <Text style={styles.subTitleText}>Our Mission</Text>
                            <Text style={styles.bodyText}>
                                'Health is Wealth, So Eat Good Food.'
                                Our mission is to redefine well-being by providing not just meals but experiences that
                                invigorate, nourish, and bring joy.
                                We are committed to empowering individuals to savour every bite, fostering a community
                                where
                                good food becomes the cornerstone of a vibrant, energetic life.
                                Join us on this delicious journey towards a healthier, happier you! 🌱🥗
                            </Text>
                        </ImageBackground>
                        <ImageBackground source={PATHS.green}
                                         resizeMode="contain"
                                         imageStyle={{width: '100%', height: "90%"}}
                        >
                            <Text style={styles.subTitleText}>Our Vision</Text>
                            <Text style={styles.bodyText}>
                                Innovation Ignited: We embrace creativity and forward-thinking in every aspect.
                                Passion for Well-Being: We're dedicated to providing nutritious, delicious meals that
                                contribute to a healthier and happier lifestyle.

                            </Text>
                            <Text style={styles.bodyText}>
                                User-Centric Excellence: We strive for excellence in crafting a seamless, user-friendly
                                experience, ensuring that every interaction with Lunch Bucket is a delight.
                                Collaborative Energy: Our team works together, drawing on diverse skills and
                                perspectives,
                                to create a vibrant and dynamic atmosphere that resonates in every meal.
                                Social Impact Focus: Lunch Bucket is not just a service; it's a catalyst for a
                                healthier,
                                more connected community.
                            </Text>
                            <Text style={styles.bodyText}>
                                Relentless Quality: From the ingredients we select to the technology we employ, we're
                                relentless in our pursuit of excellence, ensuring that every bite reflects our
                                commitment to
                                quality.
                            </Text>
                            <View style={{paddingVertical: 30, height: 40}}/>
                        </ImageBackground>
                        <Text style={[styles.titleText, [{marginVertical: 20}]]}>We Developed Lunch Bucket</Text>
                        <Image source={
                            PATHS.i211
                        } style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 1,
                            objectFit: "contain",
                            marginBottom: 14
                        }}/>
                        <Text style={styles.bodyText}>
                            Meet the ingenious minds of i211 Solutions, who brought Lunch Bucket to
                            life – a team committed to innovation, teamwork, and social well-being.
                        </Text>
                        <Text style={styles.bodyText}>
                            👨‍💻 Innovative Thinkers: Our developers are not just coders; they are innovators who breathe
                            life into ideas.
                        </Text>
                        <Text style={styles.bodyText}>
                            🤝 Team Work: Collaborative problem-solving is at the heart of our process, ensuring a
                            seamless and user-friendly experience.
                        </Text>
                        <Text style={styles.bodyText}>
                            🔧 Tech Wizards: With a wizardry of technology, our skillful team has crafted an app that
                            redefines convenience in meal planning.
                        </Text>
                        <Text style={styles.bodyText}>
                            🌐 High-Tech Approach: Lunch Bucket embraces a high-tech approach, ensuring you experience
                            the future of meal preparation.
                        </Text>
                        <Text style={styles.bodyText}>
                            🌍 Beyond Profit: It's not just about profit; it's about social well-being. Join us in
                            creating a healthier, happier community with Lunch Bucket.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bodyContainer: {
        flex: 10
    },
    scrollViewStyle: {
        marginHorizontal: 20,
    },
    contentContainer: {
        marginVertical: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    info: {
        fontSize: 14,
        marginTop: 5,
        color: '#666',
        marginBottom: 10,
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginVertical: 10,
    },
    subTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    bodyText: {
        fontSize: 14,
        textAlign: 'justify',
        marginHorizontal: 10,
        marginVertical: 10,
    },
});
