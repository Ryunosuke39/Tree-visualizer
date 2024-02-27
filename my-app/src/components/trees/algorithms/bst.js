import Node from '../node/node'

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert = (weight) => {
    this.root = this.insertRec(this.root, weight)
  }

  insertRec = (root, weight) => {
    if (root === null) {
      root = new Node(weight, null, null)
      return root
    } else {
      if (weight < root.weight) {
        root.left = this.insertRec(root.left, weight)
      } else if (weight > root.weight) {
        root.right = this.insertRec(root.right, weight)
      }
      return root
    }
  }

  search = (weight) => {
    return this.searchRec(this.root, weight)
  }

  searchRec = (root, weight) => {
    if (root === null || root.weight === weight) {
      return root
    }
    if (weight < root.weight) {
      return this.searchRec(root.left, weight)
    }
    return this.searchRec(root.right, weight)
  }
}

export default BinarySearchTree
