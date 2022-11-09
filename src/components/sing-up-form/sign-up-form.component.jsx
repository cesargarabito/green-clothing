import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component.jsx'
import './sign-up-form.styles.scss'
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
console.log(formFields);

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
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
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
        </div>
    );
}

export default SignUpForm;