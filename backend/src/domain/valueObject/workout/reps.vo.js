import { VOFormatException } from '../../errors/voFormat.exeption.js'
import { ValueObject } from '../valueObject.js'

const REPS_REGEX = /^[0-9]{1,3}$/

export class VOReps extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof VOReps &&
            this.value === valueObject.value
        )
    }

    assertIsValid(value) {
        if (!REPS_REGEX.test(value)) {
            throw new VOFormatException(VOReps.name, value)
        }
    }
}