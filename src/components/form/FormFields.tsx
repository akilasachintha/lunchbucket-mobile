import React from 'react';
import FormField from './FormField';

interface Field {
    placeholder: string;
    name: string;
    secureTextEntry?: boolean;
    isEyeEnabled?: boolean;
}

interface FormFieldsProps {
    handleChange: (name: string) => (text: string) => void;
    handleBlur: (name: string) => () => void;
    values: { [key: string]: string };
    errors: { [key: string]: string };
    touched: { [key: string]: boolean };
    fields: Field[];
}

const FormFields: React.FC<FormFieldsProps> = ({handleChange, handleBlur, values, errors, touched, fields}) => {
    return (
        <>
            {fields.map((field, i) => (
                <FormField
                    key={i}
                    placeholder={field.placeholder}
                    onChangeText={handleChange(field.name)}
                    onBlur={handleBlur(field.name)}
                    value={values[field.name]}
                    error={touched[field.name] && errors[field.name]}
                    secureTextEntry={field.secureTextEntry}
                    isEyeEnabled={field.isEyeEnabled}
                    isCorrect={(touched[field.name] && !errors[field.name])}
                />
            ))}
        </>
    );
};

export default FormFields;
