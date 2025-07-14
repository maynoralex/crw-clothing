import { useState } from "react";
import { createAuthUserWithEmailPassword, createUserDocFromAuth } from "../../utils/firebase/firebase";

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

    console.log(formFields);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }
        try{
            const { user } = await createAuthUserWithEmailPassword(email, password);
            
            await createUserDocFromAuth( user, { displayName } )
        }
        catch(error){
            console.log('user creation encountered an error: ', error);
        }
        
    }
    const handleEvent = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div>
            <h1>Sign Up with your e-mail and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" required name="displayName" onChange={handleEvent} value={displayName}/>
                <label>E-mail</label>
                <input type="email" required name="email" onChange={handleEvent} value={email}/>
                <label>Password</label>
                <input type="password" required name="password" onChange={handleEvent} value={password}/>
                <label>Confirm Password</label>
                <input type="password" required name="confirmPassword" onChange={handleEvent} value={confirmPassword}/>
                <button type="submit">Sign Up</button>  
            </form>
        </div>
    )
};

export default SignUpForm;