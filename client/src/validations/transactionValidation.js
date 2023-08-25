import * as yup from "yup"


export const transactionSchema = yup.object().shape({
    company: yup.string(),
    category: yup.string(),
    paymentType: yup.string(),
    type: yup.string().required('Required'),
    amount: yup.number().required('Required'),
    date: yup.date().required('Required')
})