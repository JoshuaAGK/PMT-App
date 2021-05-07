import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    emotionContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 50/4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 15
    },
    emoteIcon: {
      fontSize: 40
    },
    selected: {
        backgroundColor: 'limegreen',
        borderRadius: 20
    }
});

export default styles;