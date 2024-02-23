import { useState } from 'react'

import Bundle from '../bundle/bundle'
import TreeScreen from '../tree-screen/tree-screen'

export default function AssembleScreen() {
  const [numOfNodes, setNumOfNodes] = useState('3')

  function handleSubmit() {
    console.log('handle submitted')
  }

  return (
    <div>
      <Bundle
        numOfNodes={numOfNodes}
        setNumOfNodes={setNumOfNodes}
        handleSubmit={handleSubmit}
      />
      <TreeScreen />
    </div>
  )
}
