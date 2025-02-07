import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorage } from "../../features/app/service/LocalStorage";
import { USER } from "../../features/app/utils/constants/LocalStorageKeys";


const initialState: { user: string | null, isAuth: boolean } = {
    user: LocalStorage.get<string>(USER) ?? null,
    isAuth: Boolean(LocalStorage.get<string>(USER)) ,

}

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string | null>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = null;
            LocalStorage.clear();
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
    
    }
})

export default userReducer.reducer;
export const userReducerActions = userReducer.actions;