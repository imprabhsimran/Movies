import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL, API_Key } from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';


console.log(BASE_URL);
console.log(API_Key);

const fetchMovies = async (category, page) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${category}?api_key=${API_Key}&page=${page}&per_page=10`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error.response ? error.response.data : error.message);
        return { results: [], total_pages: 1 };
    }
};

export default function MoviesScreen() {
    const [movies, setMovies] = useState([]);
    const [category, setCategory] = useState("now_playing");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        loadMovies();
    }, [category, page]);

    const loadMovies = async () => {
        setLoading(true); 
        const data = await fetchMovies(category, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false); 
    };

    const navigateToDetailPage = (movie) => {
        navigation.navigate("Detail", { item: movie });
    };

    return (
        <View style={styles.container}>
            <RNPickerSelect
                onValueChange={(value) => { setCategory(value); setPage(1); }}
                items={[
                    { label: 'Now Playing', value: 'now_playing' },
                    { label: 'Popular', value: 'popular' },
                    { label: 'Top Rated', value: 'top_rated' },
                    { label: 'Upcoming', value: 'upcoming' },
                ]}
                style={{ inputIOS: styles.dropdownInput, inputAndroid: styles.dropdownInput }}
            />

            {loading ? (
                <ActivityIndicator size="large" color="red" />
            ) : (
                <FlatList
                    data={movies}
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.movieItem}>
                            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
                            <View style={styles.movieDetails}>
                                <Text style={styles.movieTitle}>{item.title}</Text>
                                <Text style={styles.movieInfo}>Popularity: {item.popularity}</Text>
                                <Text style={styles.releaseDate}>Release Date: {item.release_date}</Text>
                                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetailPage(item)}>
                                    <Text style={styles.detailsButtonText}>Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    numColumns={2} 
                    columnWrapperStyle={styles.row} 
                />
            )}

            <View style={styles.paginationContainer}>
                <TouchableOpacity disabled={page === 1} onPress={() => setPage(page - 1)} style={styles.paginationButton}>
                    <Ionicons name="chevron-back" size={10} />
                </TouchableOpacity>
                <Text style={styles.pageNumber}>{page} / {totalPages}</Text>
                <TouchableOpacity disabled={page === totalPages} onPress={() => setPage(page + 1)} style={styles.paginationButton}>
                    <Ionicons name="chevron-forward" size={10} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#121212',
    },
    dropdownInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        backgroundColor: '#1f1f1f',
        color: '#fff',
        alignSelf: 'center',
        width: '80%',
        marginBottom: 20,
    },
    movieItem: {
        flex: 1,  
        margin: 5,  
        backgroundColor: '#1e1e1e',
        padding: 10,
        borderRadius: 8,
    },
    poster: {
        width: '100%',  
        height: 160,
        marginBottom: 10,
        borderRadius: 5,
    },
    movieDetails: {
        flex: 1,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    movieInfo: {
        fontSize: 14,
        color: '#b0b0b0',
        marginVertical: 2,
    },
    releaseDate: {
        fontSize: 14,
        color: '#b0b0b0',
        marginVertical: 2,
    },
    detailsButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsButtonText: {
        color: 'white',
        fontSize: 14,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    paginationButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    pageNumber: {
        color: 'white',
        fontSize: 16,
    },
    row: {
        justifyContent: 'space-between',  
    },
});
