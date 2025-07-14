import { signInWithGooglePopup, createUserDocFromAuth } from "../../../utils/firebase/firebase";
import SignUpForm from "../../sign-up-form/sign-up-form.component.jsx";


const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocFromAuth(user);
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Log In With Google</button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn;