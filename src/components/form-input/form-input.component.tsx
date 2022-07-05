import {FormGroup} from "./form-input.styles";
import { FC, InputHTMLAttributes } from "react";

type FormInputProps = {
    label: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput = ({label, ...otherOptions}: FormInputProps) => (
    <FormGroup>
        <input className="form-input" {...otherOptions} />
        {label &&
            <label className={`${otherOptions?.value ? 'shrink' : ''} form-input-label`}>{label}</label>
        }
    </FormGroup>
);

export default FormInput;
