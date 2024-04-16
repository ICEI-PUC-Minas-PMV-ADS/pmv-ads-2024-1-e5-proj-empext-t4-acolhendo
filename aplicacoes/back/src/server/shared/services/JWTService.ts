import * as JWT from 'jsonwebtoken'
import 'dotenv/config'

interface IJWTData {
    uid: number
}

const signIn = (data: IJWTData): string | 'JWT_NOT_FOUND' => {
    if (!process.env.JWT_SECRET) {
        return 'JWT_NOT_FOUND'
    }
    return JWT.sign(data, process.env.JWT_SECRET, { expiresIn: '999d' })
}

const verify = (
    token: string
): IJWTData | 'JWT_NOT_FOUND' | 'INVALID_TOKEN' => {
    if (!process.env.JWT_SECRET) {
        return 'JWT_NOT_FOUND'
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET)

        if (typeof decoded === 'string') {
            return 'INVALID_TOKEN'
        }

        return decoded as IJWTData
    } catch (error) {
        return 'INVALID_TOKEN'
    }
}

export const JWTService = {
    signIn,
    verify,
}
