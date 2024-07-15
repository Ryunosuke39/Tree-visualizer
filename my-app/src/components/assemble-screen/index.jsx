import { createContext, useState } from 'react'
import './style.css'

import Bundle from '../bundle/bundle'
import GenerateTree from '../trees/generate-tree/generate-tree'
import BinarySearchTree from '../trees/algorithms/bst'
//BST
import TreeManipulation from '../canvas/tree-manipulation'
//Insert Node
import BstInsert from '../trees/bst-operation/bst-insert'
//search Node

export const numNodeContext = createContext()
export const generatedTreeCtx = createContext()
export const shaffledArrCtx = createContext()

// insert
export const nodeToInsertCtx = createContext()
// delete
export const nodeToDeleteCtx = createContext()
//search
export const searchNodeCtx = createContext()

export default function AssembleScreen() {
  // GENERATE TREE
  const [numOfNodes, setNumOfNodes] = useState('10')
  const [selectedAlgo, setSelectedAlgo] = useState()
  const [generatedTree, setGeneratedTree] = useState(null)
  const [shaffledArr, setShaffledArr] = useState([])

  // INSERT TREE
  const [numToInsert, setNumToInsert] = useState('')

  // DELETE TREE
  const [numToDelete, setNumToDelete] = useState('')

  // SEARCH TREE
  const [numToSearch, setNumToSearch] = useState(0)
  const [showSearchPopup, setShowSearchPopup] = useState(false)
  const [searchResult, setSearchResult] = useState([])

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
    }
    if (selectedAlgo === 'avl') {
    }
  }

  // Insert one node into existing tree( tree could be empty )
  let BstInsertedNodes = []
  function handleInsert() {
    if (selectedAlgo === 'binary-search') {
      if (numToInsert) {
        //when tree is not empty, add num to shaffledArr and regenerate tree with that array
        if (shaffledArr && shaffledArr.length) {
          // copy shaffledArr and add a inserting node
          let tempArr = []
          for (let i = 0; i < shaffledArr.length; i++) {
            tempArr.push(shaffledArr[i])
          }
          tempArr.push(Number(numToInsert))
          setShaffledArr(tempArr)

          const tempTree = new BinarySearchTree()
          // create tree ds with given array
          const { tree, arr } = BstInsert(tempTree, tempArr)
          setGeneratedTree(tree)
          setShaffledArr(arr)
        } else {
          // when tree is empty
          BstInsertedNodes.push(numToInsert)
          setShaffledArr(BstInsertedNodes)
          const tempTree = new BinarySearchTree()
          const { tree, arr } = BstInsert(tempTree, BstInsertedNodes)
          setGeneratedTree(tree)
          setShaffledArr(arr)
        }
      } else {
        console.log('insert value is empty')
      }
    }
    //avl
  }

  //  Deleting one node from tree
  function handleDelete() {
    // deleting node from data structure
    generatedTree.deleteNode(Number(numToDelete))
    // retreive tree node after deletion
    let leafs = generatedTree.getAllLeafNode()
    let nodes = generatedTree.getNodeForRegenerate(leafs)

    // receate tree with new update
    const tempTree = new BinarySearchTree()
    const { tree, arr } = BstInsert(tempTree, nodes)
    setGeneratedTree(tree)
    setShaffledArr(arr)
  }

  // search message popup
  function handleToggleSearchPopup() {
    setShowSearchPopup(!showSearchPopup)
  }
  function onClose() {
    setShowSearchPopup(false)
  }

  //  Search node with specified key value
  function handleSearch() {
    if (numToSearch) {
      let temp = generatedTree
      let result = temp.search(Number(numToSearch))
      let doesExist = result ? true : false
      setSearchResult([numToSearch, doesExist])
    }
    console.log('handleSearch pressed')
  }

  return (
    <div className='container'>
      <searchNodeCtx.Provider value={searchResult}>
        <nodeToDeleteCtx.Provider value={numToDelete}>
          <nodeToInsertCtx.Provider value={numToInsert}>
            <numNodeContext.Provider value={numOfNodes}>
              <generatedTreeCtx.Provider value={generatedTree}>
                <shaffledArrCtx.Provider value={shaffledArr}>
                  <div className='bundle'>
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
                    numToSearch={numToSearch}
                    setNumToSearch={setNumToSearch}
                    numToDelete={numToDelete}
                    setNumToDelete={setNumToDelete}
                  />
                  </div>
                  <div className='canvas-container'>
                    <div className='center-canvas'>
                    {/* <Canvas /> */}
                    <TreeManipulation />
                    </div>
                  </div>
                </shaffledArrCtx.Provider>
              </generatedTreeCtx.Provider>
            </numNodeContext.Provider>
          </nodeToInsertCtx.Provider>
        </nodeToDeleteCtx.Provider>
      </searchNodeCtx.Provider>
    </div>
  )
}
