import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, StyleSheet, ScrollView } from 'react-native';
import wifi from 'react-native-android-wifi';
import RNFetchBlob from 'react-native-fetch-blob';

const WifiScreen = () => {
    const [connectedDeviceInfo, setConnectedDeviceInfo] = useState('');
    const [availableConnection, setAvailableConnection] = useState([]);


    useEffect(() => {
        try {
            // permission to access location to set wifi connection
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Wifi networks',
                    'message': 'We need your permission in order to find wifi networks'
                }
            ).then(res => {
                if (res === "granted") {
                    console.log("Thank you for your permission! :)");
                } else {
                    console.log("You will not able to retrieve wifi available networks list");
                }
            });
        } catch (err) {
            console.warn(err)
        }

        // getting list of available wifi connection
        wifi.loadWifiList((wifiStringList) => {
            var wifiArray = JSON.parse(wifiStringList);
            setAvailableConnection(wifiArray)
        },
            (error) => {
                console.log(error);
            }
        );

        // getting list of connected devices to phone hotspot
        RNFetchBlob.fs.readStream("/proc/net/arp", 'utf8')
            .then((stream) => {
                let data = ''
                stream.open()
                stream.onData((chunk) => {
                    data += chunk
                })
                stream.onEnd(() => {
                    setConnectedDeviceInfo(data);
                    console.log(data)
                })
            }).catch(err => {

            });
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.textHeading}>{"List of connected device:\n"}</Text>
                <Text style={{ fontSize: 12 }}>{connectedDeviceInfo}</Text>
                <Text style={styles.textHeading}>{"\nAvailable wifi Connection:\n"}</Text>
                {availableConnection.length > 0
                    ? availableConnection.map((list, i) => {
                        return (
                            <View key={i}>
                                <Text>{"BSSID:  " + list.BSSID}</Text>
                                <Text>{"SSID:   " + list.SSID}</Text>
                                <Text>{"capabilities:   " + list.capabilities}</Text>
                                <Text>{"frequency:  " + list.frequency}</Text>
                                <Text>{"level:  " + list.level}</Text>
                                <Text>{"timestamp:  " + list.timestamp + "\n\n"}</Text>
                            </View>
                        )
                    })

                    : <Text>No connection available</Text>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    text: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeading: {
        fontSize: 20
    }
})

export default WifiScreen;