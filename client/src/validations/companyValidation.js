import * as yup from "yup"


export const companySchema = yup.object().shape({
    company: yup.string().required('Required'),

})