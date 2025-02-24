import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { BASE_URL, API_Key } from '../config';

const fetchSearchResults = async (query, category) => {
    try {
        let url;
        if (category === 'movie') {
            url = `${BASE_URL}/search/movie?api_key=${API_Key}&query=${query}`;
        } else if (category === 'tv') {
            url = `${BASE_URL}/search/tv?api_key=${API_Key}&query=${query}`;
        } else {
            url = `${BASE_URL}/search/multi?api_key=${API_Key}&query=${query}`;
        }

        const response = await axios.get(url);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching search results:", error.response ? error.response.data : error.message);
        return [];
    }
};

export default function MovieSearchScreen({ navigation }) {
    const [query, setQuery] = useState("");  
    const [category, setCategory] = useState("movie");  
    const [movies, setMovies] = useState([]);  

    const handleSearch = async () => {
        if (query.trim()) {
            const data = await fetchSearchResults(query, category);
            setMovies(data || []);  
        } else {
            setMovies([]);  
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for a movie or TV show..."
                value={query}
                onChangeText={setQuery}
            />

            <RNPickerSelect
                onValueChange={(value) => setCategory(value)}
                items={[
                    { label: "Movies", value: "movie" },
                    { label: "TV Shows", value: "tv" },
                    { label: "", value: "multi" },
                ]}
                style={{
                    inputIOS: styles.dropdownInput,
                    inputAndroid: styles.dropdownInput,
                }}
            />

            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            {movies.length > 0 ? (
                <FlatList
                    data={movies}
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.movieItem}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                style={styles.poster}
                            />
                            <View style={styles.movieDetails}>
                                <Text style={styles.movieTitle}>{item.title || item.name}</Text>
                                <Text style={styles.tvShowInfo}>Popularity: {item.popularity}</Text>
                                <Text style={styles.releaseDate}>Release Date: {item.release_date}</Text>
                                <TouchableOpacity
                                    style={styles.moreDetailsButton}
                                    onPress={() => navigation.navigate("Detail", { item })}  
                                >
                                    <Text style={styles.moreDetailsText}>Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noResultsText}>No results found</Text>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#121212', 
        justifyContent: 'center',
    },
    searchInput: {
        height: 40,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
        backgroundColor: '#1c1c1c',
        color: 'white',
    },
    dropdownInput: {
        height: 40,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
        backgroundColor: '#1c1c1c',
        color: 'white',
    },
    searchButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 16,
    },
    movieItem: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
        borderRadius: 5,
        padding: 10,
    },
    poster: {
        width: 75,
        height: 120,
        marginRight: 10,
        borderRadius: 5,
    },
    movieDetails: {
        flex: 1,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    movieInfo: {
        fontSize: 14,
        color: 'white', 
        marginVertical: 2,
    },
    tvShowInfo: {
        fontSize: 14,
        color: 'white', 
        marginVertical: 2,
    },
    releaseDate: {
        fontSize: 14,
        color: 'white', 
        marginVertical: 2,
    },
    moreDetailsButton: {
        marginTop: 10,
        padding: 5,
        backgroundColor: 'red', 
        borderRadius: 5,
        alignItems: 'center',
    },
    moreDetailsText: {
        color: 'white',
        fontSize: 14,
    },
    noResultsText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
    },
});
