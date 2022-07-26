import uuid from 'uuid-random'
import { VOFormatException } from '../../errors/voFormat.exeption.js'
import { ValueObject } from '../valueObject.js'

export class VOUuid extends ValueObject {
    equals(valueObject) {
        return (
            valueObject instanceof VOUuid &&
            this.value === valueObject.value
        )
    }

    assertIsValid(value) {
        if (!uuid.test(value)) {
            throw new VOFormatException(VOUuid.name, value)
        }
    }
}