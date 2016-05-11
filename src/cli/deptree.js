export const depTree = {}

export function addToDepTree (file, dep) {
  depTree[file] = depTree[file] || []
  depTree[file].push(dep)
}
