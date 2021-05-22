import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    noGroupsText: {
        paddingTop: 20,
        paddingBottom: 0,
        paddingHorizontal: 30
    },
    joinGroupButton: {
        alignSelf: 'center',
        backgroundColor: 'skyblue',
        margin: 10,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 20
    },
    joinGroupButtonText: {
        fontWeight: 'bold'
    },
    groupView: {
        padding: 30,
        borderColor: 'gray',
        borderTopWidth: 2,
    },
    groupsViewFirst: {
        borderTopWidth: 0,
    },
    groupViewName: {
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center'
    }
});

export default styles;