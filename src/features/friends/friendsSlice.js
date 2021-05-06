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
const { addFriend, resetFriendsList, addFriendRequest, removeFriendRequest, resetFriendRequestsList } = actions;

export { addFriend, resetFriendsList, addFriendRequest, removeFriendRequest, resetFriendRequestsList };
export default reducer;