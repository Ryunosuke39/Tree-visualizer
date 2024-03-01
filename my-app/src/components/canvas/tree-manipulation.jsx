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

    ctx.beginPath()
    ctx.arc(this.x, this.y, 30, 0, Math.PI * 2)
    ctx.strokeStyle = 'blue'
    ctx.stroke()

    ctx.font = '30px Arial'
    ctx.fillText(this.num, this.x, this.y)
  }

  // the root should not be the canvas node
  // need to get access to left, right
  function RecPlaceCanvasNode(root, num, x, y, ctx) {
    if (root == null) {
      let root = new CanvasNode(num, x, y, ctx)
      return root
    }
    if (num < root.num) {
      x = x - 120
      y = y + 100
      root.left = RecPlaceCanvasNode(root.left, num, x, y, ctx)
    } else if (num > root.num) {
      x = x + 120
      y = y + 100
      root.right = RecPlaceCanvasNode(root.right, num, x, y, ctx)
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
      let compareNode = null

      for (let i = 0; i < shaffledArr.length; i++) {
        // set root node
        if (i === 0) {
          root = new CanvasNode(shaffledArr[i], c.canvas.width / 2, 100, c)
          compareNode = root
        } else {
          // call recursive function
          // RecPlaceCanvasNode(root, num, x, y, ctx)
          RecPlaceCanvasNode(root, shaffledArr[i], root.x, root.y, c)
        }
      }
    }
  }, [shaffledArr])
  return <canvas ref={canvasRef}></canvas>
}
