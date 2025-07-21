import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailPassword } from "../../utils/firebase/firebase";
import  FormInput  from "../form-input/form-input.component"
import Button, { BUTTON_TYPE_CLASSES }   from '../button/button.component'


const SignInForm = () =>
{
    const defaultFormFields = {
        email: '',
        password: ''
    };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password  } = formFields;

    

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
        <SignInContainer>
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
                 <ButtonsContainer>
                    <Button type="submit">Sign In</Button>  
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signinWithGoogle}>Google sign in</Button>  
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
};

export default SignInForm;