import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, StyleSheet } from 'react-native';
import wifi from 'react-native-android-wifi';
import RNFetchBlob from 'react-native-fetch-blob';

const WifiScreen = () => {

    const [result, setResult] = useState('');


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
                console.log(data)
            })
        })


    return (
        <View>
            <Text style={styles.text}>{"Output:" + result}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: { fontSize: 30, justifyContent: 'center', alignItems: 'center' }
})

export default WifiScreen;