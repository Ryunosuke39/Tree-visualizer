import { useRef, useEffect, useContext, useState } from 'react'

// CONTEXT IMPORT
import { generatedTreeCtx } from '../assemble-screen'
import { shaffledArrCtx } from '../assemble-screen'

function Node(x, y, radius, string, left, right) {
  this.x = x
  this.y = y
  this.radius = radius
  this.string = string
  this.left = left
  this.right = right

  // draw circle node
  this.draw = function (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.strokeStyle = 'blue'
    ctx.stroke()
    ctx.font = '30px Arial'
    ctx.fillText(this.string, this.x, this.y)
  }
}

// test
function drawTree(ctx, shaffledArray, tree) {
  let values = []
  for (let i = 0; i < shaffledArray; i++) {
    // position root node at absolute position
    if (i == 1) {
      let value = tree.search(shaffledArray[i])
      values.push(value)
      let left = tree.search(shaffledArray[i]).left
      let right = tree.search(shaffledArray[i]).right
      let rootNode = new Node(ctx.canvas.width / 2, 100, 30, value, left, right)
      rootNode.draw(ctx)
    } else {
      // child nodes
      let x = ctx.canvas.width
      let y = ctx.canvas.height
      let value = tree.search(shaffledArray[i])
      // change x, y position of node by comparing exisiting node
      for (let j = 0; j < values.length; j++) {
        // when value < values[i]
        if (value < values[j]) {
          x = x + 100
          y = y + 100
        } else {
          // when value > values[i]
          x = x - 100
          y = y - 100
        }
      }
      let childNode = new Node(x, y, 30, value, 0, Math.PI * 2)
      childNode.draw(ctx)
    }
  }
}

export default function Animation() {
  const canvasRef = useRef(null)
  const generatedTree = useContext(generatedTreeCtx)
  const shaffledArr = useContext(shaffledArrCtx)

  useEffect(() => {
    // SETUP
    const canvas = canvasRef.current
    const c = canvas.getContext('2d')
    c.canvas.width = window.innerWidth
    c.canvas.height = window.innerHeight
    let animationFrameId

    console.log('shaffled arr is ', shaffledArr)
    const canvasNodes = []

    // Show Nodes from tree test: working
    if (shaffledArr && shaffledArr.length) {
      // create canvas node object based on generated tree(bst) and shaffled array
      for (let i = 0; i < shaffledArr.length; i++) {
        // x, y, radius, etc ...
        let tempNode = new Node(
          c.canvas.width / 2,
          100 * i + 100,
          30,
          shaffledArr[i],
          generatedTree.search(shaffledArr[i]).left,
          generatedTree.search(shaffledArr[i]).right
        )
        canvasNodes.push(tempNode)
      }
      console.log('canvas nodes list is', canvasNodes)
    }

    // draw tree
    // drawTree(c, shaffledArr, generatedTree)
    let values = []
    if (shaffledArr && shaffledArr.length) {
      for (let i = 0; i < shaffledArr.length; i++) {
        // position root node at absolute position
        if (i == 0) {
          let value = generatedTree.search(shaffledArr[i]).weight
          console.log('root value is', value)
          console.log('shaffledArr is', shaffledArr)
          console.log('shaffledArry[1] is', shaffledArr[i])
          values.push(value)
          let left = generatedTree.search(shaffledArr[i]).left
          let right = generatedTree.search(shaffledArr[i]).right
          let rootNode = new Node(
            c.canvas.width / 2,
            100,
            30,
            JSON.stringify(value),
            left,
            right
          )
          rootNode.draw(c)
        } else {
          // child nodes
          let x = c.canvas.width / 2
          let y = 300
          let value = generatedTree.search(shaffledArr[i]).weight
          // change x, y position of node by comparing exisiting node
          for (let j = 0; j < values.length; j++) {
            // when value < values[i]
            if (value > values[j]) {
              x = x + 100
              y = y - 100
            } else {
              // when value > values[i]
              x = x - 100
              y = y - 100
            }
          }
          let childNode = new Node(
            x,
            y,
            30,
            JSON.stringify(value),
            0,
            Math.PI * 2
          )
          childNode.draw(c)
        }
      }
    }

    // cleanUp
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [shaffledArr])

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  )
}
