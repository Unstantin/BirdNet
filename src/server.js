import express from 'express'
import * as UserService from "./Services/UserService.js"
import * as ObservationService from "./Services/ObservationService.js"
import * as TaxonService from "./Services/TaxonService.js"
import authenticateToken from './authenticateToken.js';
import cookieParser from 'cookie-parser'
import httpLogger from './httpLogger.js'

const app = express()
app.use(cookieParser())
app.use(httpLogger);
const PORT = process.env.PORT || 3000
const BASE_URL = '/api/'

async function main() {
    app.use(express.json())

    app.post(BASE_URL + 'reg', async function(req, res) {
        const result = await UserService.registration(req.body.username, req.body.login, req.body.password)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json({mes: "OK"})
        }
    })

    app.post(BASE_URL + 'auth', async function(req, res) {
        const result = await UserService.authentication(req.body.login, req.body.password)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            res.cookie("jwt", result.token, {
                httpOnly: false, // Cookie недоступны через JavaScript
                secure: false, // Cookie отправляются только по HTTPS (в продакшене)
                maxAge: 3600000 * 12, // Время жизни cookie (1 час)
            })
            res.cookie("isAdmin", result.is_admin, {
                httpOnly: false, // Cookie недоступны через JavaScript
                secure: false, // Cookie отправляются только по HTTPS (в продакшене)
                maxAge: 3600000 * 12, // Время жизни cookie (1 час)
            })
            return res.status(200).json(result)
        }
    })

    app.get(BASE_URL + 'users/:username', async function(req, res) {
        const result = await UserService.getUserProfileByUsername(req.params.username)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json(result)
        }
    })

    
    app.get(BASE_URL + 'observations', async function(req, res) {
        const result = await ObservationService.getObservations(req.query)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json(result)
        }
    })

    app.post(BASE_URL + 'observations', authenticateToken, async function(req, res) {
        if(req.no_token) return res.status(403).json("Нет токена")
        const result = await ObservationService.createObservation(req.user, req.body)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json(result)
        }
    })

    app.get(BASE_URL + 'observations/:id', authenticateToken, async function(req, res) {
        const result = await ObservationService.getObservation(req.no_token == false ? null : req.user, req.params.id)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json(result)
        }
    })

    app.delete(BASE_URL + 'observations/:id', authenticateToken, async function(req, res) {
        if(req.no_token) return res.status(403).json("Нет токена")
        const result = await ObservationService.deleteObservation(req.user.userId, req.params.id)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json(result)
        }
    })

    app.get(BASE_URL + 'profile', authenticateToken, async function(req, res) {
        if(req.no_token) return res.status(403).json("Нет токена")
        const result = await UserService.getUserProfile(req.user.userId)
        return res.status(200).json(result)    
    })

    app.post(BASE_URL + 'taxons', authenticateToken, async function(req, res) {
        if(req.no_token) return res.status(403).json("Нет токена")
        const result = await TaxonService.createTaxon(req.user.userId, req.body)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json(result)
        }
    })

    app.listen(PORT, () => {
        console.log("SERVER START AT 3000")
    })
}

main()