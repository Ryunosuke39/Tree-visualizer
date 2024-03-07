import { createContext, useState } from 'react'

import Bundle from '../bundle/bundle'
import Canvas from '../canvas/canvas'
import GenerateTree from '../trees/generate-tree/generate-tree'
import BinarySearchTree from '../trees/algorithms/bst'
//BST
import TreeManipulation from '../canvas/tree-manipulation'
//Insert Node
import BstInsert from '../trees/bst-operation/bst-insert'

export const numNodeContext = createContext()
export const generatedTreeCtx = createContext()
export const shaffledArrCtx = createContext()

// insert
export const nodeToInsertCtx = createContext()
export const InsertedArrCtx = createContext()

export default function AssembleScreen() {
  // GENERATE TREE
  const [numOfNodes, setNumOfNodes] = useState('3')
  const [selectedAlgo, setSelectedAlgo] = useState()
  const [generatedTree, setGeneratedTree] = useState(null)
  const [shaffledArr, setShaffledArr] = useState([])

  // INSERT TREE
  const [numToInsert, setNumToInsert] = useState('')
  const [InsertedArr, setInsertedArr] = useState([])

  // DELETE TREE
  // SEARCH TREE

  // handle algorithm slection function
  function handleAlgoChange(e) {
    const selectedValue = e.target.value
    setSelectedAlgo(selectedValue)
    console.log(selectedValue)
  }

  // Generate tree based on the chosen algo
  function handleGenerateTree() {
    if (selectedAlgo === 'binary-search') {
      const tempTree = new BinarySearchTree()
      const { tree, arr } = GenerateTree(tempTree, numOfNodes)
      setGeneratedTree(tree)
      setShaffledArr(arr)
      console.log('tree is', tree)
      console.log('arr is ', arr)
    }
    if (selectedAlgo === 'avl') {
    }
  }

  // Insert one node into existing tree( tree could be empty )
  let BstInsertedNodes = []
  function handleInsert() {
    if (numToInsert) {
      //when tree is not empty, add num to shaffledArr and regenerate tree with that array
      if (shaffledArr && shaffledArr.length) {
        // copy shaffledArr
        let tempArr = []
        for (let i = 0; i < shaffledArr.length; i++) {
          tempArr.push(shaffledArr[i])
        }
        tempArr.push(Number(numToInsert))
        setShaffledArr(tempArr)
        console.log('array changed', tempArr)
        const tempTree = new BinarySearchTree()
        // create tree ds with given array
        const { tree, arr } = BstInsert(tempTree, tempArr)
        setGeneratedTree(tree)
        setShaffledArr(arr)
        console.log('tree is', tree)
        console.log('arr is ', arr)
      } else {
        // when tree is empty
      }
    } else {
      console.log('value is empty')
    }
  }
  //  Deleting one node from tree
  function handleDelete() {
    console.log('handleDelete pressed')
  }
  //  Search node with specified key value
  function handleSearch() {
    console.log('handleSearch pressed')
  }

  return (
    <>
      <InsertedArrCtx.Provider value={InsertedArr}>
        <nodeToInsertCtx.Provider value={numToInsert}>
          <numNodeContext.Provider value={numOfNodes}>
            <generatedTreeCtx.Provider value={generatedTree}>
              <shaffledArrCtx.Provider value={shaffledArr}>
                <Bundle
                  numOfNodes={numOfNodes}
                  setNumOfNodes={setNumOfNodes}
                  handleGenerateTree={handleGenerateTree}
                  handleInsert={handleInsert}
                  handleDelete={handleDelete}
                  handleSearch={handleSearch}
                  handleAlgoChange={handleAlgoChange}
                  numToInsert={numToInsert}
                  setNumToInsert={setNumToInsert}
                />
                <Canvas />
              </shaffledArrCtx.Provider>
            </generatedTreeCtx.Provider>
          </numNodeContext.Provider>
        </nodeToInsertCtx.Provider>
      </InsertedArrCtx.Provider>
    </>
  )
}
