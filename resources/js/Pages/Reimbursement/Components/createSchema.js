import * as yup from "yup"

const MAX_FILE_SIZE = 4

function getExtension(filename) {
    return filename.split('.').pop();
}

const createReimbursementSchema = yup.object({
    name: yup.string().label('Name').required().max(250),
    description: yup.string().label('Description').required().max(500),
    document: yup.mixed().label('Document').test({
        message: 'Document is required',
        test: (file, context) => {
            if (file?.length == 0) {
                return false;
            }
            return true
        }
    }).test({
        message: 'Please provide a supported file type',
        test: (file, context) => {
            if (file?.length == 0) {
                return false;
            }
            const isValid = ['png', 'jpg', 'pdf'].includes(getExtension(file[0]?.name));
            if (!isValid) context?.createError();
            return isValid;
        }
    }).test({
        message: `File too big, can't exceed ${MAX_FILE_SIZE}MB`,
        test: (file, context) => {
            if (file?.length == 0) {
                return false;
            }

            const size = (file[0]?.size ?? 0) / 1024 / 1024;
            console.log(size)
            const isValid =  MAX_FILE_SIZE > size;
            return isValid;
        }
    })
})

export default createReimbursementSchema;
