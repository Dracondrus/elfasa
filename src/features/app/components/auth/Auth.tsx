import { useAppDispatch } from "../../../../hooks/redux";
import { userReducerActions } from "../../../../store/reducers/userReducer";

const Auth :React.FC = () => {
   
     const dispatch = useAppDispatch();


    return (
        <div>Auth
            <br />
            <button onClick={() =>  dispatch(userReducerActions.setIsAuth(true))}>set auth </button>
            
        </div>
    )
}
export default Auth