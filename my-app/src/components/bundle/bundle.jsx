import './bundle-style.css'
import { searchNodeCtx } from '../assemble-screen'
import { useContext } from 'react'

export default function Bundle({
  numOfNodes,
  setNumOfNodes,
  handleGenerateTree,
  handleInsert,
  handleDelete,
  handleSearch,
  algotype,
  handleAlgoChange,
  numToInsert,
  setNumToInsert,
  numToSearch,
  setNumToSearch,
  numToDelete,
  setNumToDelete,
}) {
  const searchResult = useContext(searchNodeCtx)
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
              <option value='binary-search'>Binary-Search</option>
              <option value='avl'>AVL-InProgress...Sorry</option>
            </select>
          </li>
          <div className='generate-container'>
            <li>
              <label htmlFor='number-of-elements'>Number of element</label>
              <input
                type='number'
                name='numberOfElements'
                value={numOfNodes}
                id='number-of-elements'
                placeholder='number-of-elements'
                onChange={(e) => setNumOfNodes(e.target.value)}
              ></input>
            </li>

            <li>
              <button name='generateButton' onClick={handleGenerateTree}>
                Generaet Tree
              </button>
            </li>
          </div>
          <div className='insert-container'>
            <li name='InsertLi'>
              <label name='numberToInsertLabel' htmlFor='number-to-insert'>
                Number to insert
              </label>
              <input
                type='number'
                name='numberToInsert'
                value={numToInsert}
                id='number-to-insert'
                placeholder='number to insert'
                onChange={(e) => setNumToInsert(e.target.value)}
              ></input>
            </li>
            <li name='InsertButtonLi'>
              <button name='insertButton' onClick={handleInsert}>
                Insert Node
              </button>
            </li>
          </div>
          <div className='delete-container'>
            <li>
              <label htmlFor='number-to-delete'>Number to delete</label>
              <input
                type='number'
                value={numToDelete}
                id='number-to-delete'
                placeholder='number to delete'
                onChange={(e) => setNumToDelete(e.target.value)}
              ></input>
            </li>
            <li>
              <button onClick={handleDelete}>Delete Node</button>
            </li>
          </div>
          <div className='search-container'>
            <li>
              <label htmlFor='number-to-search'>Number to search</label>
              <input
                type='number'
                value={numToSearch}
                id='number-to-search'
                placeholder='number to search'
                onChange={(e) => setNumToSearch(e.target.value)}
              ></input>
            </li>
            <li>
              <button onClick={handleSearch}>Search Node</button>
            </li>
          </div>
          <div>
            <li>
              <div>{searchResult}</div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  )
}
