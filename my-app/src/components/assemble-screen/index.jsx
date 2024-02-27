import { createContext, useState } from 'react'

import Bundle from '../bundle/bundle'
import Canvas from '../canvas/canvas'
import GenerateTree from '../trees/generate-tree/generate-tree'
import BinarySearchTree from '../trees/algorithms/bst'

export const numNodeContext = createContext()
export const generatedTreeCtx = createContext()
export const shaffledArrCtx = createContext()

export default function AssembleScreen() {
  const [numOfNodes, setNumOfNodes] = useState('3')
  const [selectedAlgo, setSelectedAlgo] = useState()
  const [generatedTree, setGeneratedTree] = useState(null)
  const [shaffledArr, setShaffledArr] = useState([])

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
            />
            <Canvas />
          </shaffledArrCtx.Provider>
        </generatedTreeCtx.Provider>
      </numNodeContext.Provider>
    </>
  )
}
