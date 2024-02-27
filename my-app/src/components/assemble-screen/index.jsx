import { createContext, useState } from 'react'

import Bundle from '../bundle/bundle'
import Canvas from '../canvas/canvas'
import GenerateTree from '../trees/generate-tree/generate-tree'
import BinarySearchTree from '../trees/algorithms/bst'

export const numNodeContext = createContext()

export default function AssembleScreen() {
  const [numOfNodes, setNumOfNodes] = useState('3')
  const [selectedAlgo, setSelectedAlgo] = useState()

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
      const tree = GenerateTree(tempTree, numOfNodes)
      console.log('tree is', tempTree)
    }
  }

  // Insert one node into existing tree( tree could be empty )
  function handleInsert() {
    console.log('handleInsert Pressed')
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
      <numNodeContext.Provider value={numOfNodes}>
        <Bundle
          numOfNodes={numOfNodes}
          setNumOfNodes={setNumOfNodes}
          handleGenerateTree={handleGenerateTree}
          handleInsert={handleInsert}
          handleDelete={handleDelete}
          handleSearch={handleSearch}
          handleAlgoChange={handleAlgoChange}
        />
        <Canvas />
      </numNodeContext.Provider>
    </>
  )
}
