import { ApplicationNotFoundException } from '../applicationNotFound.exeption.js'

export class IdIsNotFoundException extends ApplicationNotFoundException {
    constructor() {
        super('The ID is not found in use')
    }
}