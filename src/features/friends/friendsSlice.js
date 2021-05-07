import {createSlice} from '@reduxjs/toolkit';
import {  } from '../../firebase/firestore/firestoreService';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        friendsList: [],
        friendRequestsList: []
    },
    reducers: {
        addFriend: (state = this.initialState, action) => {
            state.friendsList.push(action.payload);
        },
        removeFriend: (state = this.initialState, action) => {
            let friendIndex = state.friendsList.indexOf(action.payload);
            state.friendsList.splice(friendIndex, 1);
        },
        resetFriendsList: (state = this.initialState) => {
            state.friendsList = [];
        },
        addFriendRequest: (state = this.initialState, action) => {
            state.friendRequestsList.push(action.payload);
        },
        removeFriendRequest: (state = this.initialState, action) => {
            let friendRequestIndex = state.friendRequestsList.indexOf(action.payload);
            state.friendRequestsList.splice(friendRequestIndex, 1);
        },
        resetFriendRequestsList: (state = this.initialState) => {
            state.friendRequestsList = [];
        },
    }
});

const { actions, reducer } = authSlice;
const { addFriend, removeFriend, resetFriendsList, addFriendRequest, removeFriendRequest, resetFriendRequestsList } = actions;

export { addFriend, removeFriend, resetFriendsList, addFriendRequest, removeFriendRequest, resetFriendRequestsList };
export default reducer;