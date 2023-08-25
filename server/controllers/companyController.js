const Company= require('../model/companyModel')


const getAllCompanies = async (req,res) =>{

    const {userID} = req.body;
    
    if(!userID) return res.json({message:'UserID not found.', status: 400})

    const companies = await Company.find({userID:userID});

    const newFormatedCompanies = [];

    companies.map(object =>{
                newFormatedCompanies.push({id: object.id, company:object.company})
            })

    return res.status(200).json(newFormatedCompanies);

}

const addNewCompany = async (req, res) =>{

    const {userID, company} = req.body;

    if(!company) return res.json({message: "Field missing", status:422})

    if(!userID) return res.json({message:'UserID not found.', status: 400});

    const doesCompanyExist = await Company.findOne({userID, company})

    if(doesCompanyExist) return res.json({message: 'That company already exists.', status:409})

    await Company.create({userID:userID, company:company});
    return res.json({message: 'Successfully added a new company', status:201})

}

const deleteCompany = async (req, res) =>{

    const {companyID} = req.body;

    if(!companyID) return res.json({message: "Company ID missing.", statys: 422})

    await Company.findById(companyID).deleteOne();
    
    return res.json({message: "Successfully deleted the company.", status:200});
}

module.exports = {

    getAllCompanies,
    addNewCompany,
    deleteCompany
}