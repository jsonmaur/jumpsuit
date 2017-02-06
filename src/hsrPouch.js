import PouchDB from 'pouchdb-browser'
//

const db = new PouchDB('jumpsuit_hsr')

export default {
  save,
  restore
}

function save (ts, state) {
  return db.put({
    _id: String(ts),
    state: JSON.stringify(state)
  })
}

function restore (ts) {
  return db.get(ts)
    .then(doc => {
      cleanDB()
      return JSON.parse(doc.state)
    })
}

function cleanDB () {
  return db.allDocs()
    .then((res) => {
      if (res.rows.length < 20) return Promise.resolve(db)
      console.info('Cleaning HSR Pouch history...')
      const docs = res.rows.map(d => {
        return {
          id: d.id,
          rev: d.value.rev,
          _deleted: true
        }
      })
      return db.bulkDocs(docs)
    })
    .then((res) => {
      return db.compact()
    })
    .then(() => {
      console.info('Cleaned.')
      return db
    })
}
