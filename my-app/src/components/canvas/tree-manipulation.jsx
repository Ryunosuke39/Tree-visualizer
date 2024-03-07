import { useContext, useEffect, useRef, useState } from 'react'

import { shaffledArrCtx } from '../assemble-screen'
import { generatedTreeCtx } from '../assemble-screen'
import { nodeToInsertCtx } from '../assemble-screen'

// insert function
export function InsertNum(num, shaffledArr) {
  shaffledArr.push(num)
  console.log(' now shaffled arr is ', shaffledArr)
}

export default function RenderTree() {
  const canvasRef = useRef(null)
  // generate tree
  const shaffledArr = useContext(shaffledArrCtx)
  const generatedTree = useContext(generatedTreeCtx)
  // Insert
  const numToInsert = useContext(nodeToInsertCtx)

  // node obj
  function CanvasNode(num, x, y, ctx, height) {
    this.num = num
    this.x = x
    this.y = y
    this.height = height

    // circle
    ctx.beginPath()
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2)
    ctx.fillStyle = 'blue'
    ctx.fill()
    ctx.strokeStyle = 'blue'
    ctx.stroke()

    // text
    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 1
    ctx.strokeText(this.num, this.x - 5, this.y - 2)
    ctx.fillStyle = 'white'
    ctx.font = '18px Arial'
    ctx.fillText(this.num, this.x - 5, this.y - 2)
  }

  // get canvas node from canvas nodes array based on the weight its passed
  function getCanvasNodeFromNode(num, nodesArr) {
    if (nodesArr && nodesArr.length) {
      for (let i = 0; i < nodesArr.length; i++) {
        if (num === nodesArr[i].num) {
          return nodesArr[i]
        }
      }
      // console.log(`ERROR: canvas node with ${num} does not exist`)
      return false
    }
  }

  // get all children canvas node. root is canvas node
  function getAllChildren(root, nodes) {
    let result = []
    console.log('getAllC root: ', root)
    // recursively search node and add all
    function getAllRecChildren(root) {
      if (root === null) {
        console.log('got all children')
        return result
      }
      if (generatedTree.search(root.num).left) {
        console.log('entered1')
        let tempL = generatedTree.search(root.num).left
        // converting pure node to canvas root node
        let canvasLChild = getCanvasNodeFromNode(tempL, nodes)
        console.log('canvasLChild: ', canvasLChild)
        if (canvasLChild.num < root.num) {
          result.push(canvasLChild)
          getAllRecChildren(canvasLChild)
        }
      }
      if (generatedTree.search(root.num).right) {
        console.log('entered2')
        let tempR = generatedTree.search(root.num).right
        let canvasRChild = getCanvasNodeFromNode(tempR, nodes)
        console.log('canvasRChild: ', canvasRChild)
        if (canvasRChild.num > root.num) {
          result.push(canvasRChild)
          getAllRecChildren(canvasRChild)
        }
      }
      // error handling return
      return root
    }

    // use inner recersive function
    getAllRecChildren(root)
    return result
  }

  // get right half of tree nodes
  function getRightHalfNode(root, parents, nodes) {
    let result = []
    // if current node has chid, get all decendants, and add to results
    if (
      generatedTree.search(root.num).left ||
      generatedTree.search(root.num).right
    ) {
      let children = getAllChildren(root, nodes)
      for (let i = 0; i < children.length; i++) {
        result.push(children[i])
      }
    }
    // get all parents(conposing canvas nodes)
    for (let i = 0; i < parents.length; i++) {
      result.push(parents[i])
      // if parent has right child, get and add it too
      // !!!!  this will add already added node
      //only add right child of the direct parent of root!
      if (generatedTree.search(parents[i].num).right) {
        let children = getAllChildren(parents[i], nodes)
        for (let j = 0; j < children.length; j++) {
          result.push(children[i])
        }
      }
    }

    return result
  }

  // sort canvasNodes array based on each canvas height, if there is more than one canvasNode having same nodes
  // sort that subtree based on each node's weight
  function getSortedNodesArray(canvasNodes) {
    // DEFORME TREE TO AVOID PLACING NODE AT SAME POS
    let sortedHeightNodes = []
    // copy canvas Nodes for craeting sorted node
    for (let a = 0; a < canvasNodes.length; a++) {
      sortedHeightNodes.push(canvasNodes[a])
    }
    // sort canvasNodes on height
    sortedHeightNodes.sort((a, b) => a.height - b.height)
    console.log('sortedHeightNode: ', sortedHeightNodes)

    let sameHeightIndexIndicate = []
    //get end position of same height element from start to end of sorted array
    for (let b = 0; b < sortedHeightNodes.length - 1; b++) {
      if (sortedHeightNodes[b].height !== sortedHeightNodes[b + 1].height) {
        sameHeightIndexIndicate.push(b + 1)
      }
    }

    // check if if there is more than one node that has same height
    let sortNeedArr = []
    for (let d = 0; d < sameHeightIndexIndicate.length - 1; d++) {
      let temp1 = sameHeightIndexIndicate[d + 1]
      let temp2 = sameHeightIndexIndicate[d]

      if (temp1 - temp2 > 1) {
        sortNeedArr.push(sameHeightIndexIndicate[d])
        sortNeedArr.push(sameHeightIndexIndicate[d + 1])
      }
    }

    // sort again based on num of element within the nodes having same height as other
    for (let c = 0; c < sortNeedArr.length - 1; c += 2) {
      let startPos = sortNeedArr[c]
      let nextStartPos = sortNeedArr[c + 1]

      // sort array based on their num(weight)
      const temp = sortedHeightNodes
        .slice(startPos, nextStartPos)
        .sort((a, b) => a.num - b.num)
      // replace array with sorted sub-array
      sortedHeightNodes.splice(startPos, nextStartPos - startPos, ...temp)
    }

    console.log('sorted arr on num is:', sortedHeightNodes)
    return sortedHeightNodes
  }

  // craete canvas nodes, fill empty canvas nodes, return it
  function fillRecCanvasNodes(
    root,
    num,
    x,
    y,
    ctx,
    Lcount,
    Rcount,
    nodesArr,
    isLeft,
    parents
  ) {
    if (root == null) {
      let height = Lcount + Rcount
      let x = parents[parents.length - 1].x + 50
      let y = parents[parents.length - 1].y + 100
      //check how many node have same height
      // let temp = []
      // for (let a = 0; a < nodesArr.length; a++) {
      //   temp.push(nodesArr[a])
      // }
      // temp.sort((a, b) => a.height - b.height)

      // let MaxHeight = temp[temp.length - 1].height

      // let MaxHeightNode = 0

      // for (let b = 0; b < temp.length; b++) {
      //   if (temp[b].height === MaxHeight) {
      //     MaxHeightNode++
      //   }
      // }

      // if (MaxHeightNode > 2) {
      // }

      // ORIGINAL
      if (nodesArr && nodesArr.length) {
        if (height === 1) {
          isLeft ? (x -= 1280) : (x += 1280)
        }
        if (height === 2) {
          isLeft ? (x -= 640) : (x += 640)
        }
        if (height === 3) {
          isLeft ? (x -= 320) : (x += 320)
        }
        if (height === 4) {
          isLeft ? (x -= 160) : (x += 160)
        }
        if (height === 5) {
          isLeft ? (x -= 80) : (x += 80)
        }
        if (height === 6) {
          isLeft ? (x -= 40) : (x += 40)
        }
        if (height === 7) {
          isLeft ? (x -= 20) : (x += 20)
        }
      }

      let root = new CanvasNode(num, x, y, ctx, height)
      nodesArr.push(root)

      // draw line between nodes
      for (let k = 0; k < shaffledArr.length; k++) {
        // tempNode is node from pure data structure js
        let tempNode = generatedTree.search(shaffledArr[k])
        for (let l = 0; l < nodesArr.length; l++) {
          if (tempNode.weight === nodesArr[l].num) {
            let tempL = tempNode.left
            let tempR = tempNode.right
            if (tempL !== null) {
              let tempCanvasNode = getCanvasNodeFromNode(tempL.weight, nodesArr)
              if (tempCanvasNode) {
                ctx.beginPath()
                ctx.moveTo(nodesArr[l].x, nodesArr[l].y)
                ctx.lineTo(tempCanvasNode.x, tempCanvasNode.y)
                ctx.strokeStyle = 'blue'
                ctx.stroke()
              }
            }
            if (tempR !== null) {
              let tempCanvasNode = getCanvasNodeFromNode(tempR.weight, nodesArr)
              if (tempCanvasNode) {
                ctx.beginPath()
                ctx.moveTo(nodesArr[l].x, nodesArr[l].y)
                ctx.lineTo(tempCanvasNode.x, tempCanvasNode.y)
                ctx.strokeStyle = 'blue'
                ctx.stroke()
              }
            }
          }
        }
      }
      return root
    }
    if (num < root.num) {
      isLeft = true
      Lcount++
      parents.push(root)
      // change parent root to left
      root.left = fillRecCanvasNodes(
        root.left,
        num,
        x,
        y,
        ctx,
        Lcount,
        Rcount,
        nodesArr,
        isLeft,
        parents
      )
    } else if (num > root.num) {
      isLeft = false
      Rcount++
      parents.push(root)
      root.right = fillRecCanvasNodes(
        root.right,
        num,
        x,
        y,
        ctx,
        Lcount,
        Rcount,
        nodesArr,
        isLeft,
        parents
      )
    }
    return root
  }

  // is insert num already exist or not?
  function checkNumExistOrNot(numToInsert, nodesArray) {
    for (let i = 0; i < nodesArray.length; i++) {
      if (numToInsert == nodesArray[i].num) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    console.log('USE EFFECT CALLED')
    // canvas setup
    const canvas = canvasRef.current
    const c = canvas.getContext('2d')
    c.canvas.width = window.innerWidth
    c.canvas.height = window.innerHeight

    if (shaffledArr && shaffledArr.length) {
      //if (shaffledArr.length > 10) {
      c.canvas.width += 6000
      c.canvas.height += 4000
      //}
    }

    // GENERATE TREE
    if (shaffledArr && shaffledArr.length) {
      let root = null
      let canvasNodes = []

      for (let i = 0; i < shaffledArr.length + 1; i++) {
        // parents arr will have its decentants, arr will be reseted at each iteration
        let parents = []
        // set root node
        if (i === 0) {
          root = new CanvasNode(shaffledArr[i], c.canvas.width / 2, 100, c, 0)
          canvasNodes.push(root)
        } else {
          // call recursive function
          // RecPlaceCanvasNode(root, num, x, y, ctx)
          let enterRightCount = 0
          let enterLeftCount = 0
          let isLeft = false
          //function fillRecCanvasNodes(root, num, x, y, ctx, Lcount, Rcount, nodesArr)
          fillRecCanvasNodes(
            root,
            shaffledArr[i],
            root.x,
            root.y,
            c,
            enterLeftCount,
            enterRightCount,
            canvasNodes,
            isLeft,
            parents
          )
        }
      }

      //sort filled out array depends on height, weight
      let temp = getSortedNodesArray(canvasNodes)
      console.log(' temp :', temp)

      // Insert a node
      if (numToInsert) {
        console.log(
          `node${numToInsert} exist?`,
          checkNumExistOrNot(numToInsert, canvasNodes)
        )
      }
    }
  }, [shaffledArr])
  return <canvas ref={canvasRef}></canvas>
}
