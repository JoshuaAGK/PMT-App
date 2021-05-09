import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    emotionContainer: {
        
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
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