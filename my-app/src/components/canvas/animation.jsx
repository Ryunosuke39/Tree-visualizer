import { useRef, useEffect, useContext } from 'react'

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

  this.draw = function (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.strokeStyle = 'blue'
    ctx.stroke()
    ctx.font = '30px Arial'
    ctx.fillText(this.string, this.x, this.y)
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
    let frameCount = 0
    let animationFrameId

    // Draw Test
    // const node1 = new Node(100, 100, 30, 'A')
    // node1.draw(c)
    console.log('shaffled arr is ', shaffledArr)
    const nodes = []

    // Show Nodes from tree
    if (shaffledArr && shaffledArr.length) {
      for (let i = 0; i < shaffledArr.length; i++) {
        let tempNode = new Node(
          c.canvas.width / 2,
          100 * i + 100,
          10,
          shaffledArr[i],
          generatedTree.search(shaffledArr[i]).left,
          generatedTree.search(shaffledArr[i]).right
        )
        tempNode.draw(c)
        nodes.push(tempNode)
      }
    }

    // other code
  }, [shaffledArr])

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  )
}
