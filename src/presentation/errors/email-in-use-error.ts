export class EmailInUseError extends Error {
  constructor () {
    super('THe received email is already in use')
    this.name = 'EmailInUseError'
  }
}
