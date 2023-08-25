import * as yup from "yup"


export const categorySchema = yup.object().shape({
    category: yup.string().required('Required')

})