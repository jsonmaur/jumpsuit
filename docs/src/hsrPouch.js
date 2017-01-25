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
    state
  })
}

function restore (ts) {
  return db.get(ts)
    .then(doc => {
      return doc.state
    })
}
