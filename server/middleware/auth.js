import jwt from 'jsonwebtoken'

export default async(req, res, next) => {
    try {     
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500

        req.userId = token && isCustomAuth ? jwt.verify(token, 'test').id : jwt.decode(token).sub
        
        next()
    } catch (error) {
        console.log(error)
    }
    

} 