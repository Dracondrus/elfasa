import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorage } from "../../hooks/LocalStorage";
import { ADMIN, AUTH, USER } from "../../features/app/utils/constants/LocalStorageKeys";


const initialState: { user: string | null, isAuth: boolean , isAdmin : string | null} = {
    user: LocalStorage.get<string>(USER) ?? null,
    isAuth: Boolean(LocalStorage.get(AUTH)) ?? false,
    isAdmin : LocalStorage.get<string>(ADMIN) ?? null
}

const userReducer = createSlice({
    name: USER,
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string | null>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = null;
            state.isAdmin = null;
            LocalStorage.clear();
        },

        setIsAuth: (state, action: PayloadAction<boolean>) => {
            LocalStorage.set(USER, action.payload);
            state.isAuth = action.payload;
        },
        setIsAdmin: (state, action: PayloadAction<string>) => { 
            LocalStorage.set(ADMIN, action.payload);
            state.isAdmin = action.payload;
        }
   
    }
})

export default userReducer.reducer;
export const userReducerActions = userReducer.actions;