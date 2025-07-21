import { SignUpContainer } from './sign-up-form.styles';
import { useState } from "react";
import { createAuthUserWithEmailPassword, createUserDocFromAuth } from "../../utils/firebase/firebase";
import  FormInput  from "../form-input/form-input.component"
import Button from '../button/button.component'



const SignUpForm = () =>
{
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }
        try{
            const { user } = await createAuthUserWithEmailPassword(email, password);
            
            await createUserDocFromAuth( user, { displayName } )
            resetFormFields();
        }
        catch(error){
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error: ', error);
            }
        }
        
    }
    const handleEvent = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your e-mail and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                 label = "DisplayName"
                 type="text" 
                 required name="displayName" 
                 onChange={handleEvent} 
                 value={displayName}/>
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
                 <FormInput
                 label = "Confirm Password"
                 type="password"
                 required 
                 name="confirmPassword"
                 onChange={handleEvent} 
                 value={confirmPassword}/>
                <Button type="submit">Sign Up</Button>  
            </form>
        </SignUpContainer>
    )
};

export default SignUpForm;