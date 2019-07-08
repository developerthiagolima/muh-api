const DAO = require('../dao/dao')

export default {
    Query:{
        async listarCidade(parent, args, { mysql, request }, info) {
            let dao = new DAO("cidade", mysql)
            return dao.findByFields({
                ...args,
                flativo: "S"
            })
        },
    },
  
    Mutation:{
        async criarCidade(parent, args, { mysql, request }, info) {
            let dao = new DAO("cidade", mysql)
            const connection = await mysql.getConnectionFromPool()
            try{
                let _result = await dao.insert(connection, {
                    ...args.data,
                    flativo: "S"
                })
                return dao.find(_result.insertId)
            }finally{
                if (connection != null) connection.release()
            }
        },
        async atualizarCidade(parent, args, { mysql, request }, info) {
            let dao = new DAO("cidade", mysql)
            const connection = await mysql.getConnectionFromPool()
            try{
                await dao.update(connection, {
                    id: args.id,
                    data: args.data
                })
                return dao.find(args.id)
            } finally {
                if (connection != null) connection.release()
            }
        },
        async deletarCidade(parent, args, { mysql, request }, info) {
            let dao = new DAO("cidade", mysql)
            const connection = await mysql.getConnectionFromPool()
            try{
                await dao.update(connection, {
                    id: args.id,
                    data: {
                        flativo: "N"
                    }
                })
                return "OK"
            } finally {
                if (connection != null) connection.release()
            }
        },
    },
  }