import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Chip } from 'react-native-paper';
import axios from 'axios';

function MovieDetail({ navigation, route }) {
    const { name, episode, air_date, characters, species } = route.params;
    const [characterInfo, setCharacterInfo] = useState([]);

    useEffect(() => {
        getCharacter();
    }, [])

    const getCharacter = async () => {
        for (let i = 0; i < characters.length; i++) {
            const res = await axios.get(`${characters[i]}`)
            setCharacterInfo(infos => [...infos, res.data])
        }
    }

    const Item = ({ item, onPress }) => (
        <TouchableOpacity key={item.id} onPress={() => { navigation.navigate("CharacterDetail", item) }}>
            <View style={styles.container}>

                <TouchableOpacity onPress={() => { }}>
                    <Image style={styles.tinyLogo} source={{ uri: `${item.image}` }} />
                </TouchableOpacity>

                <View style={styles.content}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.time}>
                            {item.air_date}
                        </Text>
                    </View>

                    <Text style={{ fontSize: 18 }}>Species: {item.species}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <View style={styles.movieContainer}>
                <Chip icon="information" selectedColor='red' style={styles.chips}>Episode name: {name}</Chip>
                <Chip icon="update" selectedColor='purple' style={styles.chips}>Release Date: {air_date}</Chip>
                <Chip icon="movie" selectedColor='green' style={styles.chips}>Episode: {episode}</Chip>
                <Text style={styles.headerTwo}>Characters</Text>
            </View>
            <FlatList
                data={characterInfo}
                renderItem={Item}
                style={styles.root}
                key={characterInfo.id}
            />
        </>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    chips: {
        backgroundColor: 'white',
    },
    container: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 12,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 20,
        marginLeft: 3
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        color: 'black',
        fontSize: 16,
    },
    movieContainer: {
        backgroundColor: '#FFFFFF'
    },
    movieData: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 5,
        marginBottom: 15
    },
    headerTwo: {
        color: '#10B981',
        marginLeft: 15,
        fontSize: 20,
        marginBottom: 5,
        textShadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 0.3
    }
});

export default MovieDetail;