import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, StyleSheet } from 'react-native';
import wifi from 'react-native-android-wifi';
import RNFetchBlob from 'react-native-fetch-blob';

const WifiScreen = () => {

    const [result, setResult] = useState('');
    const [connectedDeviceInfo, setConnectedDeviceInfo] = useState('');


    useEffect(() => {
        try {
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
    }, []);

    // wifi.isEnabled((isEnabled) => {
    //     if (isEnabled) {
    //         console.log("wifi service enabled");
    //     } else {
    //         console.log("wifi service is disabled");
    //     }
    // });

    // wifi.loadWifiList((wifiStringList) => {
    //     var wifiArray = JSON.parse(wifiStringList);
    //     console.log(wifiArray);
    // },
    //     (error) => {
    //         console.log(error);
    //     }
    // );


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
        })


    return (
        <View>
            <Text style={{fontSize:20}}>List of connected device:</Text>
            <Text style={{ fontSize: 12 }}>{connectedDeviceInfo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: { fontSize: 30, justifyContent: 'center', alignItems: 'center' }
})

export default WifiScreen;