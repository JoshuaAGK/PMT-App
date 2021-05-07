import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
     width: '100%',
     marginBottom: 40,
     display: 'flex',
     alignItems: 'center'
    },
    profileNameText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        marginVertical: 10,
        padding: 15,
        width: '70%',
        backgroundColor: '#ff5e73',
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
    
export default styles;