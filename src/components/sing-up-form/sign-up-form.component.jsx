import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component.jsx'
import { SignUpContainer, Suh2 } from "./sign-up-form.styles";
import Button from "../button/button.component";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    
    

const resetFormFields = () => {
 setFormFields(defaultFormFields);
}
    
const handleChange = (event) => {
const { name, value } = event.target;
setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, { displayName });
            
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('failed, email already used');
            } else {
                console.log('user created error', error.message)
            }
                
        }
        
    };
    return (
        <SignUpContainer>
            <Suh2>Dont have an account yet?</Suh2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                label='Display Name' 
                type='text' 
                onChange={handleChange} 
                name='displayName' 
                value={displayName}
                 />
               
                <FormInput 
                label='Email'
                type='email' 
                onChange={handleChange} 
                name='email' 
                value={email} 
                 />
                
                <FormInput 
                type='password' 
                onChange={handleChange} 
                name='password' 
                value={password} 
                label='Password' />
                
                <FormInput 
                type='password' 
                onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword} 
                label='Confirm Password' />
                <Button type="submit">Sign up</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;