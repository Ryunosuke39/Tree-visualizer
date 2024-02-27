import BinarySearchTree from '../algorithms/bst.js'

// randomize array in-place using Dustenfeld shuffle algorithm
function shaffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}

// create array
function createArray(num) {
  var temp = []
  for (var i = Number(1); i <= Number(num); i++) {
    temp.push(i)
  }
  return temp
}

// this will take numOfNode value, create chosen tree data structure containing randomized node
export default function GenerateTree(tree, num) {
  // const tree = new BinarySearchTree()
  let arr = shaffleArray(createArray(num))

  if (arr && arr.length) {
    arr.map((arrItem) => tree.insert(arrItem))
  } else {
    console.log('ERROR: arr is empty')
    console.log('num is ', num)
  }
  return { tree, arr }
}
