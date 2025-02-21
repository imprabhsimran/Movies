import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL, API_Key } from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const fetchTVShows = async (category, page) => {
    try {
        const response = await axios.get(`${BASE_URL}/tv/${category}?api_key=${API_Key}&page=${page}&per_page=10`);  // Ensure `per_page` or similar pagination parameter
        return response.data;
    } catch (error) {
        console.error("Error fetching TV shows:", error.response ? error.response.data : error.message);
        return { results: [], total_pages: 1 };
    }
};

export default function TVShowsScreen() {
    const [tvShows, setTvShows] = useState([]);
    const [category, setCategory] = useState("airing_today");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigation = useNavigation();

    useEffect(() => {
        loadTVShows();
    }, [category, page]);

    const loadTVShows = async () => {
        const data = await fetchTVShows(category, page);
        setTvShows(data.results);
        setTotalPages(data.total_pages);
    };

    const navigateToDetailPage = (tvShow) => {
        navigation.navigate("Detail", { item: tvShow });
    };

    return (
        <View style={styles.container}>
            <RNPickerSelect
                onValueChange={(value) => { setCategory(value); setPage(1); }}
                items={[
                    { label: 'Airing Today', value: 'airing_today' },
                    { label: 'On The Air', value: 'on_the_air' },
                    { label: 'Popular', value: 'popular' },
                    { label: 'Top Rated', value: 'top_rated' },
                ]}
                style={{ inputIOS: styles.dropdownInput, inputAndroid: styles.dropdownInput }}
            />

<FlatList
    data={tvShows}
    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
    renderItem={({ item }) => (
        <View style={styles.tvShowItem}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
            <View style={styles.tvShowDetails}>
                <Text style={styles.tvShowTitle}>{item.name}</Text>
                <Text style={styles.tvShowInfo}>Popularity: {item.popularity}</Text>
                <Text style={styles.releaseDate}>Release Date: {item.first_air_date}</Text>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetailPage(item)}>
                    <Text style={styles.detailsButtonText}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )}
    numColumns={2} 
    columnWrapperStyle={styles.row} 
/>


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
    tvShowItem: {
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
    tvShowDetails: {
        flex: 1,
    },
    tvShowTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    tvShowInfo: {
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
    paginationText: {
        color: 'white',
        fontSize: 14,
    },
    pageNumber: {
        color: 'white',
        fontSize: 16,
    },
    row: {
        justifyContent: 'space-between', 
    },
});

