const DAO = require('../dao/dao')

export default {
    Query: {
        async listarBairro(parent, args, { mysql, request }, info) {
            let dao = new DAO("bairro", mysql)
            return dao.findByFields({
                ...args,
                flativo: "S"
            })
        },
    },

    Mutation: {
        async criarBairro(parent, args, { mysql, request }, info) {
            let dao = new DAO("bairro", mysql)
            const connection = await mysql.getConnectionFromPool()
            try {
                let _result = await dao.insert(connection, {
                    ...args.data,
                    flativo: "S"
                })
                return dao.find(_result.insertId)
            } finally {
                if (connection != null) connection.release()
            }
        },
        async atualizarBairro(parent, args, { mysql, request }, info) {
            let dao = new DAO("bairro", mysql)
            const connection = await mysql.getConnectionFromPool()
            try {
                await dao.update(connection, {
                    id: args.id,
                    data: args.data
                })
                return dao.find(args.id)
            } finally {
                if (connection != null) connection.release()
            }
        },
        async deletarBairro(parent, args, { mysql, request }, info) {
            let dao = new DAO("bairro", mysql)
            const connection = await mysql.getConnectionFromPool()
            try {
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

    Bairro: {
        async cidadeid(parent, args, { mysql }, info) {
            return (await mysql.createQuery({
                query: `SELECT * FROM ?? WHERE id = ? LIMIT 1;`,
                params: ["cidade", parent.cidadeid]
            })).shift()
        },
    },
}