
const validatorHashMap = () =>{

    const validatorHashMap = new Map();

    validatorHashMap.set('FREE', [1,2])
    validatorHashMap.set('PREMIUM', [3])
    validatorHashMap.set('PRO', [])
    
    return validatorHashMap;
}

const productIDToPlanHashMap = () =>{

    const productIDToPlanHashMap = new Map();
    productIDToPlanHashMap.set(1, 'PREMIUM')
    productIDToPlanHashMap.set(2,'PRO')
    productIDToPlanHashMap.set(3, 'PRO')
    return productIDToPlanHashMap;

}

module.exports = {
    validatorHashMap,
    productIDToPlanHashMap
}
