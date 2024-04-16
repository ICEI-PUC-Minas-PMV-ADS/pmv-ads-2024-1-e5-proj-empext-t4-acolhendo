import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services';

export const authValidator: RequestHandler = (request, response, next) => {
    const {authorization} = request.headers
    if (!authorization){
        return response.status(StatusCodes.UNAUTHORIZED).json({errors: {
            default: 'Não autenticado'
        }})
    }

    const [type, token] = authorization.split(' ')
    if (type !== 'Bearer') {
        return response.status(StatusCodes.UNAUTHORIZED).json({errors: {
            default: 'Não autenticado'
        }})
    }

    const jwtData = JWTService.verify(token)
    if (jwtData === 'INVALID_TOKEN') {
        return response.status(StatusCodes.UNAUTHORIZED).json({errors: {
            default: 'Não autenticado'
        }})
    } else if (jwtData === 'JWT_NOT_FOUND') {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao verificar token'
            }
        })
    }
    request.headers.idUsuario = jwtData.uid.toString()
    return next()
}
