
const validatorHashMap = () =>{

    const validatorHashMap = new Map();

    validatorHashMap.set('FREE', [1,2])
    validatorHashMap.set('PREMIUM', [3])
    
    return validatorHashMap;
}

module.exports = {
    validatorHashMap
}
