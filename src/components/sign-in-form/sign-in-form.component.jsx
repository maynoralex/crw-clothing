import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailPassword } from "../../utils/firebase/firebase";
import  FormInput  from "../form-input/form-input.component"
import './sign-in-form.styles.scss'
import Button from '../button/button.component'

const SignInForm = () =>
{
    const defaultFormFields = {
        email: '',
        password: ''
    };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password  } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signinWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            await signInAuthUserWithEmailPassword(email, password);
            resetFormFields();
        }
        catch(error){
            switch (error.code)
            { 
                case 'auth/wrong-password':
                    alert('Incorrect password for e-mail');
                    break
                case 'auth/user-not-found':
                    alert('Incorrect password for e-mail');
                    break;
                default:
                    console.log(error);
            }
        }
        
    }
    const handleEvent = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your e-mail and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                 label = "E-mail"
                 type="email" 
                 required name="email" 
                 onChange={handleEvent} 
                 value={email}/>
                 <FormInput
                 label = "Password"
                 type="password"
                 required 
                 name="password"
                 onChange={handleEvent} 
                 value={password}/>
                 <div className="buttons-container">
                    <Button type="submit">Sign In</Button>  
                    <Button type="button" buttonType={"google"} onClick={signinWithGoogle}>Google sign in</Button>  
                </div>
            </form>
        </div>
    )
};

export default SignInForm;