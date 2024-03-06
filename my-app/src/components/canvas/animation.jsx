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

// test: can not print nodes. not recursive
// content of this function copied directly inside useEffect: working, currently commented out
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

// need to get access to the root node, and root node need to be data-structure node, not canvas node
// so that we can compare node weight with another child weight to structure tree.
// current issue is the props function taking is canvas node so you can not access weight variable like node.weight
// though we are passing weight value, we can solve this issue, then how can we set the first weight variable to be null
// so function can keeps it root(weight) and compare it with newly passed node, the function need to have constructor
// right now, there is not data structure in placeNodeRec so it won't save the info about first inserted node(root)
function placeNodeRec(rootNode, x, y, weight, tree, shaffledArr, ctx) {
  console.log('function called and node is', rootNode)
  if (rootNode == null) {
    // place root canvas node in abs pos
    rootNode = new Node(x, y, 30, weight, null, null)
    let value = tree.search(shaffledArr[0]).weight
    let left = tree.search(shaffledArr[0]).left
    let right = tree.search(shaffledArr[0]).right
    console.log('from placeNodeRec: root node is', rootNode)
    console.log(
      'from placeNodeRec: rootNode weight is ',
      JSON.stringify(rootNode.weight)
    )
    rootNode.draw(ctx)
    return rootNode
  }
  if (weight < rootNode.weight) {
    console.log('entered')
    x = x - 100
    y = y + 100
    rootNode.left = placeNodeRec(
      rootNode.left,
      x,
      y,
      weight,
      tree,
      shaffledArr,
      ctx
    )
  } else if (weight > rootNode.weight) {
    console.log('entered')
    x = x + 100
    y = y + 100
    rootNode.right = placeNodeRec(
      rootNode.right,
      x,
      y,
      weight,
      tree,
      shaffledArr,
      ctx
    )
  }

  return rootNode
}

// main animation function with canvas setup
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

    // node1
    // let node1V = generatedTree.search(shaffledArr[0]).weight

    //Generate Tree
    if (shaffledArr && shaffledArr.length) {
      let root = null
      console.log('shaffled arr is', shaffledArr)

      for (let i = 0; i < shaffledArr.length; i++) {
        let value = generatedTree.search(shaffledArr[i]).weight
        console.log('value is', value)
        let left = generatedTree.search(shaffledArr[i]).left
        let right = generatedTree.search(shaffledArr[i]).right
        let x = c.canvas.width / 2
        let y = 100
        // function Node(x, y, radius, string, left, right)
        root = new Node(
          x,
          y,
          30,
          generatedTree.search(shaffledArr[i]).weight,
          left,
          right
        )
        // this.placeNodeRec = function (rootNode, x, y, weight, tree, shaffledArr, ctx)
        root = placeNodeRec(root, x, y, value, generatedTree, shaffledArr, c)
        console.log('root node is', root)
        if (root) {
          console.log('root node is', root)
          console.log(`node at ${i} idx is`, root)
          // root.draw(c)
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
