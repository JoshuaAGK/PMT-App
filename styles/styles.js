import { Platform, StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / 375;
    const newSize = Math.round(ratio * Dimensions.get('window').width);
    return newSize; 
}

const styles = StyleSheet.create({
    platformShadow: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: 'white',
        borderRadius: 50/4,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 15,
            },
            default: {
                elevation: 4,
            }
        })
    },
    minorShadow: {
        backgroundColor: "white",
        borderRadius: 50/4,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.1,
                shadowRadius: 7,
            },
            default: {
                elevation: 4,
            }
        })  
    },
    lowestElementOnPageToGiveItABottomMarginBecauseAndroidIsWeirdAndDoesntLikeShadowsForSomeReason: {
        marginBottom: 10
    },
    mainPage: {
        width: "100%",
        overflow: "visible",
        marginTop: "15%",
        marginBottom: "5%",
    },

    bigText: {
        fontSize: scaleFontSize(30),
        fontWeight: "500",
        marginLeft: "5%"
    },
    textInput: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 50/4,
        padding: 50/4,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        marginBottom: 10
    },
    flatListView: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 50/4,
        padding: 50/4,
        paddingTop: 10,
        paddingBottom: 10,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 15,
    },
    leftMargin: {
        marginLeft: "5%"
    },
    buttonContainer: {
        paddingRight: "5%"
    },
    button: {
        padding: 10,
        width: "30%",
        backgroundColor: 'limegreen',
        borderRadius: 5,
    },
    buttonDisabled: {
        backgroundColor: '#80d180'
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    buttonErrorContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 10
    },
    errorText: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#c20a0a'
    },
    profileButton: {
        // paddingVertical: 100,
        // paddingHorizontal: 30,
        fontWeight: 'bold',
        backgroundColor: '#2ecc71'
    }
});

export default styles;