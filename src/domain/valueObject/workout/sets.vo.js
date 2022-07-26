import { VOFormatException } from '../../errors/voFormat.exeption.js'
import { ValueObject } from '../valueObject.js'

const SETS_REGEX = /^[0-9]{1,2}$/

export class VOSets extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof VOSets &&
            this.value === valueObject.value
        )
    }

    assertIsValid(value) {
        if (!SETS_REGEX.test(value)) {
            throw new VOFormatException(VOSets.name, value)
        }
    }
}