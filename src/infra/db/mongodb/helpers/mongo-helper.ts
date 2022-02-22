import { Collection, MongoClient } from 'mongodb'
import { ObjectId } from 'bson'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (collection: any, id: ObjectId): any => {
    return Object.assign({},
      collection,
      { id: id }
    )
  }
}
