// Aqui é onde cria as instâncias de todas as outras camadas
// Aqui é onde fica a árvore de dependência dos controladores e os factorys
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`server running at http:localhost:${env.port}`))
  })
  .catch(console.error)
