import Taxon from '../Entities/Taxon.js'
import User from '../Entities/User.js'

export async function createTaxon(userId, req) {
    const user = User.findOne({where: {id: userId}})
    if(user.is_admin) return {err: "Вы не админ",  code: 400}
    
    Taxon.create({
        "name": req.name,
        "science_name": req.science_name
    })

    return {}
}