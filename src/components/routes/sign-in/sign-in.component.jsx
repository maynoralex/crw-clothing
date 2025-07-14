import { signInWithGooglePopup, createUserDocFromAuth } from "../../../utils/firebase/firebase";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Log In With Google</button>
        </div>
    )
}

export default SignIn;