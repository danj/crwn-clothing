import {BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton} from "./button.styles";
import { FC, ButtonHTMLAttributes } from "react";

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton=> (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]
)

type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES,
    isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>;


const Button: FC<ButtonProps> = ({children, buttonType, isLoading, ...otherProps}) => {
    const B = getButton(buttonType);
    return (
        <B disabled={isLoading} {...otherProps}>
            { isLoading ? <ButtonSpinner /> : children}
        </B>
    )
}

export default Button;
