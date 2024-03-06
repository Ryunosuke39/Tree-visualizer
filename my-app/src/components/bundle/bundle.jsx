import './bundle-style.css'

export default function Bundle({
  numOfNodes,
  setNumOfNodes,
  handleGenerateTree,
  handleInsert,
  handleDelete,
  handleSearch,
  algotype,
  handleAlgoChange,
}) {
  return (
    <div className='bundle-container'>
      <div className='header'>
        <h3>Tree visualizer</h3>
      </div>
      <div className='body'>
        <ul>
          <li>
            <label htmlFor='algo'>Data Structure</label>
            <select
              value={algotype}
              onChange={handleAlgoChange}
              id='algo'
              defaultValue='none'
            >
              <option value='none'>Select tree</option>
              <option value='binary-search'>binary-search</option>
              <option value='heap'>heap</option>
              <option value='avl'>avl</option>
            </select>
          </li>
          <li>
            <label htmlFor='number-of-elements'>Number of element</label>
            <input
              type='number'
              value={numOfNodes}
              id='number-of-elements'
              placeholder='number-of-elements'
              onChange={(e) => setNumOfNodes(e.target.value)}
            ></input>
          </li>
          <li>
            <button onClick={handleGenerateTree}>Generaet Tree</button>
          </li>
          <li>
            <label htmlFor='number-to-insert'>Number to insert</label>
            <input
              type='number'
              id='number-to-insert'
              placeholder='number to insert'
            ></input>
          </li>
          <li>
            <button onClick={handleInsert}>Insert Node</button>
          </li>
          <li>
            <label htmlFor='number-to-delete'>Number to delete</label>
            <input
              type='number'
              id='number-to-delete'
              placeholder='number to delete'
            ></input>
          </li>
          <li>
            <button onClick={handleDelete}>Delete Node</button>
          </li>
          <li>
            <label htmlFor='number-to-search'>Number to search</label>
            <input
              type='number'
              id='number-to-search'
              placeholder='number to search'
            ></input>
          </li>
          <li>
            <button onClick={handleSearch}>Search Node</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
