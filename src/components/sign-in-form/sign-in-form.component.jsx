import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import { useState } from "react";
import  FormInput  from "../form-input/form-input.component"
import Button, { BUTTON_TYPE_CLASSES }   from '../button/button.component'
import { googleSignInStart, emailSigninStart } from '../../store/user/user.action'
import { useDispatch } from 'react-redux'

const defaultFormFields = {
        email: '',
        password: ''
};


const SignInForm = () =>
{
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password  } = formFields;

    

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signinWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            dispatch(emailSigninStart(email, password));
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