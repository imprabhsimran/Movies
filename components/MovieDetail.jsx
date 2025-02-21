import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function MovieDetailScreen({ route }) {
    const { item } = route.params;  
    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.poster}
            />
            <Text style={styles.title}>{item.title || item.name}</Text>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description:</Text>
                <Text style={styles.descriptionText}>
                    {item.overview ? item.overview : "No description available."}
                </Text>
            </View>
            <Text style={styles.info}>Popularity: {item.popularity}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#121212',
    },
    poster: {
        width: "100%",
        height: 300,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
        color: 'white',
    },
    descriptionContainer: {
        marginTop: 15,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 16,
        color: "white",  
        lineHeight: 22,
    },
    info: {
        fontSize: 16,
        color: "white",
        marginVertical: 5,
    },
});

