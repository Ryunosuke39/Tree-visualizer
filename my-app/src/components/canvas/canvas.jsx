import './canvas-style.css'
import Animation from './animation'
import TreeManipulation from './tree-manipulation'

// this is wrapper class of main window( window showing tree visualization)
export default function Canvas() {
  return (
    <>
      <Animation />
      {/* <TreeManipulation /> */}
    </>
  )
}
