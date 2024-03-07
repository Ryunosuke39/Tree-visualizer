import { useContext } from 'react'
import { InsertedArrCtx } from '../../assemble-screen'

export default function BstInsert(tree, arr) {
  if (arr && arr) {
    arr.map((arrItem) => tree.insert(arrItem))
  } else {
    console.log('inserted arr is empty')
  }
  return { tree, arr }
}
