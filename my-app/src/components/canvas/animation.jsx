import { useRef, useEffect } from 'react'

function Node(x, y, radius, string, left, right) {
  this.x = x
  this.y = y
  this.string = string
  this.left = left
  this.right = right
}

export default function Animation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // SETUP
    const canvas = canvasRef.current
    const c = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
  }, [])
  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  )
}
