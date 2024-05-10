import * as yup from "yup"

const loginSchema = yup.object({
    nip: yup.string().label('NIP').required().matches(/^\d+$/, 'The NIP field should have digits only'),
    password: yup.string().label('Password').required(),
})

export default loginSchema;
