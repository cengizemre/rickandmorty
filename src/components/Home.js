import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { EPISODESURL, HOMEIMAGE } from '../Environment';

function Home({ navigation }) {
    const [episodes, setEpisodes] = useState([]);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        getEpisodes(EPISODESURL);
    }, []);

    const getEpisodes = async (url) => {
        const data = axios.get(url).then(res => {
            setEpisodes(episodes => [...episodes, ...res.data.results]);
            setPagination(res.data.info);
        }).catch(err => {
            console.log(err);
            // bu hatalar google firebase crashlytics 'e gönderilebilir.
            // Gerekli görülürse kullanıcıya pop-up olarak hata gösterilip geri bildirim alınabilir. 
        })
    }

    const Item = ({ item, onPress }) => (
        <TouchableOpacity onPress={() => { navigation.navigate("MovieDetail", item) }}>
            <View style={styles.flatview}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.date}>Release Date: {item.air_date}</Text>
                <Text style={styles.episode}>Episode: {item.episode}</Text>
            </View>
        </TouchableOpacity>
    );

    const onEndReached = () => {
        if (!pagination.next) {
            return;
        }
        getEpisodes(pagination.next)
    }

    return (
        <View style={styles.container}>
            <Image style={styles.tinyLogo} source={{ uri: HOMEIMAGE }} />
            <Text style={styles.h2text}>R&M Episodes</Text>
            <FlatList
                data={episodes}
                renderItem={Item}
                keyExtractor={item => item.id}
                onEndReached={onEndReached}
                showsVerticalScrollIndicator={false}
                style={styles.list}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },
    h2text: {
        color: 'black',
        marginTop: 10,
        fontFamily: 'Helvetica',
        fontSize: 36,
        fontWeight: 'bold',
    },
    flatview: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
    },
    name: {
        color: 'black',
        fontFamily: 'Verdana',
        fontSize: 18
    },
    date: {
        color: 'red'
    },
    episode: {
        color: 'purple'
    }
})

export default Home;
