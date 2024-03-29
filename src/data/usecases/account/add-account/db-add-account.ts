
import {
  AddAccount,
  AddAccountParams,
  AccountModel,
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (account) {
      return null
    }
    const hashedPassword = await this.hasher.hash(accountData.password)
    // Object.assign = Permite alterar apenas uma propriedade do objeto original
    // Basicamente, estamos criando um novo objeto com base no accountData, mas com o password diferente do original
    return await this.addAccountRepository.add(
      Object.assign(
        {},
        accountData,
        { password: hashedPassword }
      )
    )

    // return new Promise(resolve => resolve(newAccount))
  }
}
