import { StyleSheet } from 'react-native';
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: 250,
        fontSize: 18
    },
    inputContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        marginBottom: 10,
        borderBottomWidth: 1
    },
    button: {
        width: 250,
        height: 50,
        borderRadius: 50,
        marginTop: 10,
        backgroundColor: "#2f347c",
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Roboto'
    }
});