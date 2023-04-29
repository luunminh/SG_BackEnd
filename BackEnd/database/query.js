// query dong 4 la connection
const executeQuery = ({ db, query, params }) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

const getOne = async ({ db, query, params }) => {
    const records = await executeQuery({ db, query, params })

    if (records.length > 0) {
        return records[0]
    }
    return null
}

const getMany = async ({ db, query, params }) => {
    const records = await executeQuery({ db, query, params })

    if (records.length > 0) {
        return records
    }
    return null
}

const create = async ({ db, query, params }) => {
    const rs = await executeQuery({ db, query, params })

    if (rs.affectedRows > 0) {
        return true
    }

    return false
}

module.exports = {
    getOne,
    create,
    executeQuery,
    getMany
}