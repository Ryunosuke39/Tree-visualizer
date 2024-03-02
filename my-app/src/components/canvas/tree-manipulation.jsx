import { useContext, useEffect, useRef, useState } from 'react'

import { shaffledArrCtx } from '../assemble-screen'
import { generatedTreeCtx } from '../assemble-screen'

export default function RenderTree() {
  const canvasRef = useRef(null)
  const shaffledArr = useContext(shaffledArrCtx)
  const generatedTree = useContext(generatedTreeCtx)

  // node obj
  function CanvasNode(num, x, y, ctx) {
    this.num = num
    this.x = x
    this.y = y

    // circle
    ctx.beginPath()
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2)
    ctx.strokeStyle = 'blue'
    ctx.stroke()

    // line
    // ctx.moveTo(this.x, this.y)
    // ctx.lineTo(100, 100)
    // ctx.strokeStyle = 'blue'
    // ctx.stroke()

    // text
    ctx.font = '20px Arial'
    ctx.fillText(this.num, this.x, this.y)
  }

  // get canvas node based on the weight its passed
  function getCanvasNodeFromNode(num, nodesArr) {
    if (nodesArr && nodesArr.length) {
      for (let i = 0; i < nodesArr.length; i++) {
        if (num === nodesArr[i].num) {
          return nodesArr[i]
        }
      }
      return false
    }
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
    RArr
  ) {
    if (root == null) {
      let root = new CanvasNode(num, x, y, ctx)
      // avoid putting node on the existing node:
      nodesArr.push(root)
      // check current node postion with existing node pos
      if (LArr && LArr.length) {
        //same as RArr
        for (let i = 0; i < LArr.length; i++) {
          if (LArr[i] === Lcount && RArr[i] === Rcount) {
            console.log(`node ${JSON.stringify(root)} is on the other node`)
            // excet root
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            nodesArr[i + 1].x = x - 50
            for (let j = 0; j < nodesArr.length; j++) {
              root = new CanvasNode(
                nodesArr[j].num,
                nodesArr[j].x,
                nodesArr[j].y,
                ctx
              )
            }
            // root = new CanvasNode(num, x, y, ctx)
          }
        }
      }
      // push L, R count as existing node
      LArr.push(Lcount)
      RArr.push(Rcount)

      // line
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
                ctx.moveTo(nodesArr[l].x, nodesArr[l].y)
                ctx.lineTo(tempCanvasNode.x, tempCanvasNode.y)
                ctx.strokeStyle = 'blue'
                ctx.stroke()
              }
            }
            if (tempR !== null) {
              let tempCanvasNode = getCanvasNodeFromNode(tempR.weight, nodesArr)
              if (tempCanvasNode) {
                ctx.moveTo(nodesArr[l].x, nodesArr[l].y)
                ctx.lineTo(tempCanvasNode.x, tempCanvasNode.y)
                ctx.strokeStyle = 'blue'
                ctx.stroke()
              }
            }

            // ctx.lineTo(100, 100)
            // ctx.strokeStyle = 'blue'
            // ctx.stroke()
          }
        }
      }

      return root
    }
    if (num < root.num) {
      Lcount++

      // change pos
      x = x - 90
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
        RArr
      )
    } else if (num > root.num) {
      Rcount++
      // change pos
      x = x + 90
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
        RArr
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
        // set root node
        if (i === 0) {
          root = new CanvasNode(shaffledArr[i], c.canvas.width / 2, 100, c)
          canvasNodes.push(root)
        } else {
          // call recursive function
          // RecPlaceCanvasNode(root, num, x, y, ctx)
          let enterRightCount = 0
          let enterLeftCount = 0
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
            rightCountArray
          )
        }
      }
      // test
      console.log('Larr: ', leftCountArray)
      console.log('Rare: ', rightCountArray)
    }
  }, [shaffledArr])
  return <canvas ref={canvasRef}></canvas>
}
