import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"users",
    initialState:{
        user:null,
    },
    reducers:{
        setCurrentUser:(state, action)=>{
            state.user = action.payload
        }
    }
});

export default userSlice.reducer;
export const {setCurrentUser} = userSlice.actions;

