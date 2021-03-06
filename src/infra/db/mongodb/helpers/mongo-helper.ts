import { Collection, MongoClient } from 'mongodb'
import { ObjectId } from 'bson'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }

    return this.client.db().collection(name)
  },

  map: (collection: any, id: ObjectId): any => {
    return Object.assign({},
      collection,
      { id: id }
    )
  },

  mapping: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  },

  mappingAll: (collectionAll: any[]): any => {
    return collectionAll.map(collection => MongoHelper.mapping(collection))
  }
}
