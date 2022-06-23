import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

function CharacterDetail({ navigation, route }) {
    const { name, image, status, species, gender, origin, location } = route.params;
    return (
        <View>
            <View style={styles.container}>
                <Image
                    resizeMode='cover'
                    style={styles.tinyLogo}
                    source={{ uri: `${image}` }}
                />
            </View>
            <Text style={styles.text}>Name: {name}</Text>
            <Text style={styles.text}>Status:{status}</Text>
            <Text style={styles.text}>Species: {species}</Text>
            <Text style={styles.text}>Gender: {gender}</Text>
            <Text style={styles.text}>Origin: {origin.name}</Text>
            <Text style={styles.text}>Location: {location.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 25
    },
    tinyLogo: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    text: {
        marginLeft: 35,
        marginTop: 12,
        fontSize: 20,
        fontWeight: '600'
    }
});

export default CharacterDetail;