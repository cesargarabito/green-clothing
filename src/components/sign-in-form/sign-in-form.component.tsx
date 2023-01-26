import { FormEvent, ChangeEvent, useState } from "react";
import FormInput from '../form-input/form-input.component'

import { SignInContainer, H2, ButtonsContainer } from "./sign-in-form.styles";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";



const defaultFormFields = {
    
    email: '',
    password: '',
    
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    


const resetFormFields = () => {
 setFormFields(defaultFormFields);
}
    
const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
const { name, value } = event.target;
setFormFields({...formFields, [name]: value});
    };
    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());    
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch(error) {
                console.log('user sign in failed', error);
            }     
    };
    return (
        <SignInContainer>
            <H2>Already have an account?</H2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <ButtonsContainer>
                <Button type="submit">Sign in</Button>
                <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >Google sign in</Button>
                </ButtonsContainer>
                
    
            </form>
        </SignInContainer>
    );
}

export default SignInForm;