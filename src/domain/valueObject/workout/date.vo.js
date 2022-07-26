import { VOFormatException } from '../../errors/voFormat.exeption.js'
import { ValueObject } from '../valueObject.js'

export class VODate extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof VODate &&
            this.value === valueObject.value
        )
    }

    assertIsValid(value) {
        if (!(new Date(value) > 0)) {
            throw new VOFormatException(VODate.name, value)
        }
    }
}