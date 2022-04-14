
import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) { }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    // Object.assign = Permite alterar apenas uma propriedade do objeto original
    // Basicamente, estamos criando um novo objeto com base no accountData, mas com o password diferente do original
    const account = await this.addAccountRepository.add(
      Object.assign(
        {},
        accountData,
        { password: hashedPassword }
      )
    )

    return new Promise(resolve => resolve(account))
  }
}
