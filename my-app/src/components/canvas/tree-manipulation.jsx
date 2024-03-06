import { useContext, useEffect, useRef, useState } from 'react'

import { shaffledArrCtx } from '../assemble-screen'
import { generatedTreeCtx } from '../assemble-screen'

export default function RenderTree() {
  const canvasRef = useRef(null)
  const shaffledArr = useContext(shaffledArrCtx)
  const generatedTree = useContext(generatedTreeCtx)

  // node obj
  function CanvasNode(num, x, y, ctx, height) {
    this.num = num
    this.x = x
    this.y = y
    this.height = height

    // circle
    ctx.beginPath()
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2)
    // ctx.fillStyle = 'blue'
    // ctx.fill()
    ctx.strokeStyle = 'blue'
    ctx.stroke()

    // text
    // ctx.fillStyle = 'white'
    ctx.font = '18px Arial'
    ctx.fillText(this.num, this.x - 5, this.y - 2)
  }

  // get canvas node from array based on the weight its passed
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

  // the root should not be the canvas node
  // need to get access to left, right
  function RecPlaceCanvasNode(
    root,
    num,
    x,
    y,
    ctx,
    Lcount,
    Rcount,
    nodesArr,
    LArr,
    RArr,
    isLeft,
    parents
  ) {
    if (root == null) {
      let height = Lcount + Rcount

      let root = new CanvasNode(num, x, y, ctx, height)
      // avoid putting node on same pos as the existing node:
      nodesArr.push(root)

      // is on the other node? when using Recursive placement
      if (LArr && LArr.length) {
        for (let i = 0; i < LArr.length; i++) {
          if (LArr[i] === Lcount && RArr[i] === Rcount) {
            console.log(`node ${JSON.stringify(root)} is on the other node`)
          }
        }
      }

      // push L, R count as existing node
      LArr.push(Lcount)
      RArr.push(Rcount)

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
      Lcount++
      isLeft = true
      parents.push(root)

      // change pos
      x = x - 50
      y = y + 50

      root.left = RecPlaceCanvasNode(
        root.left,
        num,
        x,
        y,
        ctx,
        Lcount,
        Rcount,
        nodesArr,
        LArr,
        RArr,
        isLeft,
        parents
      )
    } else if (num > root.num) {
      Rcount++
      isLeft = false
      parents.push(root)

      // change pos
      x = x + 50
      y = y + 50

      root.right = RecPlaceCanvasNode(
        root.right,
        num,
        x,
        y,
        ctx,
        Lcount,
        Rcount,
        nodesArr,
        LArr,
        RArr,
        isLeft,
        parents
      )
    }
    return root
  }

  useEffect(() => {
    // canvas setup
    const canvas = canvasRef.current
    const c = canvas.getContext('2d')
    c.canvas.width = window.innerWidth
    c.canvas.height = window.innerHeight

    if (shaffledArr && shaffledArr.length) {
      let root = null
      let canvasNodes = []
      let leftCountArray = []
      let rightCountArray = []

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
          RecPlaceCanvasNode(
            root,
            shaffledArr[i],
            root.x,
            root.y,
            c,
            enterLeftCount,
            enterRightCount,
            canvasNodes,
            leftCountArray,
            rightCountArray,
            isLeft,
            parents
          )
        }
      }

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

      //let maxHeight = sortedHeightNodes[sortedHeightNodes.length - 1].height
      //console.log('MAX: ', maxHeight)
      // reposition nodes
      // function CanvasNode(num, x, y, ctx, height)
    }
  }, [shaffledArr])
  return <canvas ref={canvasRef}></canvas>
}
