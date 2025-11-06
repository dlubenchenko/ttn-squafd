import { Input as AntInput, type InputProps } from 'antd';

Input.Password = AntInput.Password;

export default function Input(props: InputProps) {
    return <AntInput {...props} />;
}
