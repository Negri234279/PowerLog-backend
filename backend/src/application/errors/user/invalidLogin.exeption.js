import { ApplicationUnauthorizedException } from '../applicationUnauthorized.exeption.js'

export class InvalidLoginException extends ApplicationUnauthorizedException {
    constructor() {
        super('Wrong credentials')
    }
}