import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, StyleSheet, ScrollView } from 'react-native';
import wifi from 'react-native-android-wifi';
import RNFetchBlob from 'react-native-fetch-blob';
import NetInfo from "@react-native-community/netinfo";
import Devices from 'react-native-device-info'; 

const WifiScreen = () => {
    const [connectedDeviceInfo, setConnectedDeviceInfo] = useState('');
    const [availableConnection, setAvailableConnection] = useState([]);
    const [connectedTo, setConnectedTo] = useState("");
    const [deviceMacAddress, setDeviceMacAddress] = useState("");
    const [latlong, setLatlong] = useState([]);


    useEffect(() => {
        persmission();
        getConnectedDevices();
        getConnectionInfo();
        getDeviceDetails();

    }, []);

    const persmission = async () => {
        try {
            // permission to access location to set wifi connection
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                .then(res => {
                    if (res === "granted") {
                        console.log("Thank you for your permission! :)");
                        getWifiList();
                        getLatLong();
                    } else {
                        console.log("You will not able to retrieve wifi available networks list");
                    }
                });
        } catch (err) {
            console.warn(err)
        }
    }
    const getWifiList = async () => {
        // getting list of available wifi connection
        await wifi.loadWifiList(async (wifiStringList) => {
            var wifiArray = await JSON.parse(wifiStringList);
            setAvailableConnection(wifiArray)
        },
            (error) => {
                console.log(error);
            }
        );
    }

    const getConnectedDevices = async () => {
        // getting list of connected devices to phone hotspot
        await RNFetchBlob.fs.readStream("/proc/net/arp", 'utf8')
            .then(async (stream) => {
                let data = ''
                stream.open()
                stream.onData((chunk) => {
                    data += chunk
                })
                stream.onEnd(() => {
                    setConnectedDeviceInfo(data);
                })
            }).catch(err => {

            });
    }

    const getConnectionInfo = async () => {
        NetInfo.fetch().then(connection => {

            if (connection !== undefined) {
                setConnectedTo(connection)
            }

        });
    }


    const getDeviceDetails = async () => {
        Devices.getMacAddress().then(res => {
            setDeviceMacAddress(res);
        }).catch(err => {
            console.log("TCL: WifiScreen -> err", err)

        })
        // Devices.getIpAddress().then(res => {
        //     console.log("TCL: getIpAddress -> res", res)

        // });
    }

    const getLatLong = async () => {
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(async location => {
                setLatlong(location)
            }).catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            });
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.textHeading}>Device Info:</Text>
                <Text>{"HW address:  " + deviceMacAddress}</Text>
                <Text>{"latitude:  " + latlong.latitude}</Text>
                <Text>{"latitude:  " + latlong.latitude}</Text>
                <Text>{"timestamp:  " + latlong.time + "\n"}</Text>

                <Text style={styles.textHeading}>Connected network details :</Text>
                {connectedTo !== "" && connectedTo.type === 'wifi'
                    ? <View>
                        <Text>{"connected type:   " + connectedTo.type}</Text>
                        <Text>{"isConnected:   " + connectedTo.isConnected}</Text>
                        <Text>{"isInternetReachable:   " + connectedTo.isInternetReachable}</Text>
                        <Text>{"isWifiEnabled:   " + connectedTo.isWifiEnabled}</Text>

                        <Text>{"bssid:   " + connectedTo.details.bssid}</Text>
                        <Text>{"frequency:   " + connectedTo.details.frequency}</Text>
                        <Text>{"ipAddress:   " + connectedTo.details.ipAddress}</Text>
                        <Text>{"isConnectionExpensive:   " + connectedTo.details.isConnectionExpensive}</Text>
                        <Text>{"ssid:   " + connectedTo.details.ssid}</Text>
                        <Text>{"strength:   " + connectedTo.details.strength}</Text>
                        <Text>{"subnet:   " + connectedTo.details.bssid + "\n"}</Text>
                    </View>

                    : connectedTo !== "" && connectedTo.type === 'cellular'
                        ? <View>
                            <Text>{"connected to:   " + connectedTo.type}</Text>

                            <Text>{"carrier:   " + connectedTo.details.carrier}</Text>
                            <Text>{"cellularGeneration:   " + connectedTo.details.cellularGeneration}</Text>
                            <Text>{"isConnectionExpensive:   " + connectedTo.details.isConnectionExpensive + "\n"}</Text>


                            <Text style={styles.textHeading}>{"List of device connected to mobile hotspot:\n"}</Text>
                            <Text style={{ fontSize: 12 }}>{connectedDeviceInfo}</Text>
                        </View>
                        : <Text>no connection found</Text>}

                <Text style={styles.textHeading}>{"Available wifi Connection:\n"}</Text>
                {availableConnection.length > 0
                    ? availableConnection.map((list, i) => {
                        return (
                            <View key={i}>
                                <Text>{"BSSID:  " + list.BSSID}</Text>
                                <Text>{"SSID:   " + list.SSID}</Text>
                                <Text>{"capabilities:   " + list.capabilities}</Text>
                                <Text>{"frequency:  " + list.frequency}</Text>
                                <Text>{"level:  " + list.level}</Text>
                                <Text>{"timestamp:  " + list.timestamp + "\n"}</Text>
                            </View>
                        )
                    })

                    : <Text>No connection available</Text>}



            </View>
        </ScrollView >
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
        fontSize: 20,
        color: 'red'
    }
})

export default WifiScreen;