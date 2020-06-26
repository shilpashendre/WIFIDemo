import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import LibraryFunction from './screens/LibraryFunction';
import NetInfoeDevice from './NetPackage/NetLib';

const App = () => {


    NetInfoeDevice.fetch().then(connection => {
        console.log("TCL: App -> connection", connection)
        if (connection !== undefined) {
            // setConnectedTo(connection)
        }
    });

    return (
        <View>
            <Text>abcd</Text>
        </View>
    )
}

export default App;