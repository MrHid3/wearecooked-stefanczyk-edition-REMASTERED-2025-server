import MyButton from '../components/MyButton';
import {StyleSheet, TextInput, View, Text, Alert} from "react-native";
import {useEffect, useState} from 'react'

const Screen1 = ({ navigation }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    async function sendPerson(){
        if(name == "" || password == "") {
            console.log("fail")
            return;
        }
        let res = await fetch("http://192.168.119.114:3000/sendPeople", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                password: password,
            }),
        });
        return res;
    }

    return(
        <View style={styles.main}>
            <View style={styles.titleContainer}>
                <Text style={styles.h1}>Register App</Text>
                <Text style={styles.h2}>Sign in to continue</Text>
            </View>
            <View style={styles.container}>
                <TextInput inputMode="text" style={styles.input} placeholder="Name" onChangeText={(text) => setName(text)} required></TextInput>
                <TextInput inputMode="text" style={styles.input} placeholder="Password" onChangeText={(text) => setPassword(text)} secureTextEntry={true} required></TextInput>
                <MyButton text="Register" onPress={
                    useEffect(async () => {
                    let res = await sendPerson();
                    if (res.status == 200) {
                        navigation.navigate('s2');
                    }else {
                        Alert.alert("Error", "Person already exists", ["OK"]);
                    }
                })} style={styles}></MyButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ededed",
        width: "100%",
        height: "100%",
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: "#7777dd",
        borderBottomStyle: "solid",
        display: "block",
        width: 150,
        height: 30,
        lineHeight: 30,
        fontSize: 20,
        margin: 5,
        padding: 0,
        textAlign: "center",
    },
    button: {
        display: "block",
        backgroundColor: "#7777dd",
        width: "80%",
        padding: 10,
        borderRadius: 10,
        margin: 15
    },
    buttonText: {
        color: "#fdfdfd",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    titleContainer: {
        backgroundColor: "#7777dd",
        height: 160,
        width: "130%",
        position: "absolute",
        top: -20,
        textAlign: "center",
        borderBottomRightRadius: "100%",
        borderBottomLeftRadius: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    h1: {
        color: "#fdfdfd",
        fontSize: 35,
        width: "fit-content",
        fontWeight: "bold"
    },
    h2: {
        color: "#ffe438",
        width: "fit-content"
    }
})

export default Screen1;
