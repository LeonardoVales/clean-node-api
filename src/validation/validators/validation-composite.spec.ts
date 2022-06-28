import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [
    makeValidationStub(),
    makeValidationStub()
  ]
  const sut = new ValidationComposite(validationStubs)

  return {
    sut,
    validationStubs
  }
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

describe('ValidationComposite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(
      new MissingParamError('field')
    )
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should return the firts error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(
      new Error()
    )
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(
      new MissingParamError('field')
    )
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new Error())
  })

  it('Should not return if validation success', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })

    expect(error).toBeFalsy()
  })
})
