import { VOFormatException } from '../../errors/voFormat.exeption.js'
import { ValueObject } from '../valueObject.js'

const DATE_REGEX = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i

export class VODate extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof VODate &&
            this.value === valueObject.value
        )
    }

    assertIsValid(value) {
        if (!(new Date(value))/*DATE_REGEX.test(value)*/) {
            throw new VOFormatException(VODate.name, value)
        }
    }
}