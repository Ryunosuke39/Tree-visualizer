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

  // get al leaf node
  // get all path from root to that leaf node, remove duplication
  // combine all array from right part of tree to left part of tree
  // regeneraet tree with that array after deletion
  getAllLeafNode = () => {
    let allLeaf = []
    return this.getAllLeafNodeRec(this.root, allLeaf)
  }

  getAllLeafNodeRec = (root, arr) => {
    if (root == null) {
      return arr // Base case
    }
    this.getAllLeafNodeRec(root.left, arr)
    if (root.left == null && root.right == null) {
      arr.push(root.weight)
    }
    this.getAllLeafNodeRec(root.right, arr)

    return arr
  }

  getParent = (num) => {
    let tempArr = []
    this.getParentRec(this.root, num, tempArr)
    return tempArr
  }

  getParentRec = (root, weight, parents) => {
    if (root == null) {
      return root
    } else {
      if (weight < root.weight) {
        parents.push(root.weight)
        this.getParentRec(root.left, weight, parents)
      }
      parents.push(root.weight)
      this.getParentRec(root.right, weight, parents)
    }
    return root
  }

  // does this element eixst in array?
  checkDuplicateNum = (arr, num) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === num) {
        return true
      }
    }
    return false
  }

  //for each leaf node get all parent, arr is leaf nodes
  getNodeForRegenerate = (arr) => {
    let results = []
    for (let i = 0; i < arr.length; i++) {
      let parents = this.getParent(arr[i])
      for (let j = 0; j < parents.length; j++) {
        //when result have some leef's parent
        if (results && results.length) {
          //check if inserting node exist or not
          let isExist = this.checkDuplicateNum(results, parents[j])
          if (isExist == false) {
            results.push(parents[j])
          }
        } else {
          //when results empty
          results.push(parents[j])
        }
      }
    }
    return results
  }
}

export default BinarySearchTree
