import User from '../Entities/User.js'
import Observation from '../Entities/Observation.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export async function registration(username, login, password) {
    let user_by_username = await User.findOne({ where: {username: username} })
    if(user_by_username != null) return {err: "Username занят", code: 400}

    let user_by_login = await User.findOne({ where: {login: login} })
    if(user_by_login != null) return {err: "Login занят",  code: 400}

    await User.create({
        username: username,
        password: password,
        login: login,
        isAdmin: false
    })

    return {}
}

export async function authentication(login, password) {
    let user = await User.findOne({ where: {login: login} })
   
    if(!user || user.password != password) {
        return {err: "Логин или пароль не верны", code: 400}
    }

    const token = jwt.sign(
        { userId: user.id, login: user.login }, 
        process.env.JWT_SECRET, 
        { expiresIn: '12h' }
      );
    
    return { token: token, is_admin: user.is_admin};
}

export async function getUserProfileByUsername(username) {
    let user = await User.findOne({where: {username: username}})

    if(!user) {
        return {err: "Пользователь не найден", code: 404}
    }

    let observations = await Observation.findAll({where: {author_id: user.id}})

    return {
        userInfo: {
            id: user.id, 
            username: user.username
        },
        observations: observations,
        is_owner: false
    }
}

export async function getUserProfile(id) {
    let user = await User.findOne({where: {id: id}})

    if(!user) {
        return {err: "Пользователь не найден", code: 404}
    }

    let observations = await Observation.findAll({where: {author_id: user.id}})

    return {
        userInfo: {
            id: user.id, 
            username: user.username
        },
        observations: observations,
        is_owner: true
    }
}