const db = global.localStorage

export default {
  save,
  restore
}

function save (ts, state) {
  db.setItem(ts, JSON.stringify(state))
}

function restore (ts) {
  const res = JSON.parse(db.getItem(ts))
  db.removeItem(ts)
  return res
}
