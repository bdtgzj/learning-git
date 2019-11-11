let origin = [{id: 1, parentId: null, title: '1', order: 3}, {id: 2, parentId: 1, title: '2', order: 2},{id: 3, parentId: null, title: '3', order: 1},{id: 4, parentId: 1, title: '4', order: 5}, {id: 5, parentId: 2, title: '5', order: 6}]

function tableToTree(table) {
  table = table.sort((a, b) => a.order - b.order)
  let root = []
  let level = 0
  table.forEach(v => {
    v.children = []
    v.level = -1
    if (!v.parentId) {
      v.level = level
      root.push(v)
    }
  })

  const setChildren = (parent, table) => {
    let children = []
    level++
    table.forEach(v => {
      for (let i = 0, len = parent.length; i < len; i++) {
        if (v.parentId === parent[i].id) {
          v.level = level
          parent[i].children.push(v)
          children.push(v)
          break
        }
      }
    })
    if (children.length > 0) {
      setChildren(children, table)
    }
  }
  
  setChildren(root, table)
  return root
}

// DFS
function treeToTable(tree) {
  let table = []
  const getContent = (node) => {
    return {
      id: node.id,
      parentId: node.parentId,
      title: node.title,
      order: node.order,
      level: node.level
    }
  }

  const getChildren = (parent) => {
    parent.children.forEach(v => {
      table.push(getContent(v))
      getChildren(v)
    })
  }

  tree.forEach(v => {
    table.push(getContent(v))
    getChildren(v)
  })

  return table
}

const tree = tableToTree(origin)
console.log(JSON.stringify(tree))
const table = treeToTable(tree)
console.log(JSON.stringify(table))