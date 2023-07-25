import { useDispatch } from "react-redux";
import { authActions } from "../store/Auth";


const useUpdateAcc = (props) => {
  const dispatch = useDispatch();
  const { tokenKey, user } = props;

  dispatch(
    authActions.login({
      // user: userData.user,
      user,
      tokenKey: tokenKey,
    })
  );

  return null;
};

export default useUpdateAcc;
