import { Validation } from '../../protocols/validation'

/**
 * O composite recebe um array de validadores e executa esses validadores
 */
export class ValidationComposite implements Validation {
  private readonly validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
