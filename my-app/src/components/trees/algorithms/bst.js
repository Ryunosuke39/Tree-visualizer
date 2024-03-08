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

  deleteNode = (weight) => {
    this.root = this.deleteNodeRec(this.root, weight)
  }

  deleteNodeRec = (root, weight) => {
    if (root === null) {
      // returning null
      return root
    }
    if (root.weight > weight) {
      root.left = this.deleteNodeRec(root.left, weight)
      return root
    } else if (root.weight < weight) {
      root.right = this.deleteNodeRec(root.right, weight)
      return root
    }

    // when node with search weight exists
    // case1: one of child is empty
    if (root.left === null) {
      let temp = root.right
      root = null
      return temp
    } else if (root.right === null) {
      let temp = root.left
      root = null
      return temp
    }

    //case2: if both children exist
    //succ is th smallest value on the right subv-tree
    else {
      let succParent = root
      let succ = root.right

      while (succ.left !== null) {
        succParent = succ
        succ = succ.left
      }
      if (succParent !== root) {
        succParent.left = succ.right
      } else {
        succParent.right = succ.right
      }

      root.weight = succ.weight

      succ = null
      return root
    }
  }

  // for reconstructing tree after deletion
  getAllNodesInOrder = () => {
    let allNodes = []
    return this.InOrderTraversal(this.root, allNodes)
  }

  InOrderTraversal = (root, arr) => {
    if (root !== null) {
      this.InOrderTraversal(root.left, arr)
      arr.push(root.weight)
      this.InOrderTraversal(root.right, arr)
    }
    return arr
  }
}

export default BinarySearchTree
