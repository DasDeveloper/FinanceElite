const getTransactionsLimitForRequests = () =>{

    const planMap = new Map();
    planMap.set('FREE', 200);
    planMap.set('PREMIUM', 2500);
    planMap.set('PRO', Infinity)

    return planMap;

}

const getCategoriesLimitForRequests = () =>{

    const planMap = new Map();
    planMap.set('FREE', 25);
    planMap.set('PREMIUM', 75);
    planMap.set('PRO', Infinity)

    return planMap;

}
const getCompaniesLimitForRequests = () =>{
    
    const planMap = new Map();
    planMap.set('FREE', 25);
    planMap.set('PREMIUM', 75);
    planMap.set('PRO', Infinity)

    return planMap;
}


module.exports = {
    getTransactionsLimitForRequests,
    getCategoriesLimitForRequests,
    getCompaniesLimitForRequests
}