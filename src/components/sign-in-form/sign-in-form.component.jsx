import { useContext, useState } from "react";
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component.jsx'
import { SignInContainer, H2, ButtonsContainer } from "./sign-in-form.styles";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";



const defaultFormFields = {
    
    email: '',
    password: '',
    
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    


const resetFormFields = () => {
 setFormFields(defaultFormFields);
}
    
const handleChange = (event) => {
const { name, value } = event.target;
setFormFields({...formFields, [name]: value});
    };

    const signInWithGoogle = async () => {
         await signInWithGooglePopup();

          
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/wrong-password') {
                alert('failed, incorrect password for email');
            } else if(error.code === 'auth/user-not-found'){
                alert('no user associated with this email');
            } else {
                console.log(error);
            }     
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