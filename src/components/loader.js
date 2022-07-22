import React, {useState} from "react";
import {View, Text, ActivityIndicator, Modal, StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window')
const Loader = ({status}) => {
    const [modalVisible, setModalVisible] = useState(true);
    return(
        <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(true)}>
                <View style={styles.loaderContainer}>
                    <Text style={styles.status}>{status}</Text>
                    <ActivityIndicator color="white" size="large"/>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    status: {
        color: 'white',
        fontSize: height * 0.024,
        textAlign: 'center',
        width: width * 0.8
    }
})

export default Loader