import { useState, ChangeEvent, FormEvent } from "react";
import FormInput from '../form-input/form-input.component'
import { SignUpContainer, Suh2 } from "./sign-up-form.styles";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

const resetFormFields = () => {
 setFormFields(defaultFormFields);
}
    
const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
const { name, value } = event.target;
setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            
            resetFormFields();
        } catch(error) {
            if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('failed, email already used');
            } else {
                console.log('user created error', error);
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