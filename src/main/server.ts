// Aqui é onde cria as instâncias de todas as outras camadas
// Aqui é onde fica a árvore de dependência dos controladores e os factorys

import express from 'express'

const app = express()
app.listen(5050, () => console.log('server running at http:localhost:5050'))