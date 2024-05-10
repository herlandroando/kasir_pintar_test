import * as yup from "yup"

const editUserSchema = yup.object({
    // nip: yup.string().label('NIP').required().matches(/^\d+$/, 'The NIP field should have digits only').max(18),
    name: yup.string().label('Name').required().max(250),
    role: yup.string().label('Role').required().oneOf(['FINANCE', 'STAFF']),

})

const editUserPasswordSchema = yup.object({
    password: yup.string().label('Password').required().min(8),
    password_confirmation: yup.string().required().label('Confirm Password').min(8)
        .oneOf([yup.ref('password')], 'Passwords must match')
})

export { editUserSchema, editUserPasswordSchema };
