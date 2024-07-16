import './bundle-style.css'
import { searchNodeCtx } from '../assemble-screen'
import { useContext } from 'react'

import { shaffledArrCtx } from '../assemble-screen'

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
  // for generate 
  const shaffledArr = useContext(shaffledArrCtx)


  // for search res coloring 
  const searchResult = useContext(searchNodeCtx)
  let doExistCSS = searchResult[1]? 'found' : 'not-found'

  return (
    <div className='bundle-container'>
      <div className='body'>
        <ul>
          <li className='header'>
            <h3>Tree visualizer</h3>
          </li>
          <li className='operations'>

            <div className='operation'>
                <label htmlFor='algo'>Data Structure</label>
                <select
                  value={algotype}
                  onChange={handleAlgoChange}
                  id='algo'
                  defaultValue='none'
                >
                  <option value='none'>Select tree</option>
                  <option value='binary-search'>Binary-Search</option>
                  <option value='avl'>AVL-InProgress...</option>
                </select>
            </div>

            <div className='operation'>
                <label htmlFor='number-of-elements'>Set Number of Nodes</label>
                    <input
                      type='number'
                      name='numberOfElements'
                      value={numOfNodes}
                      id='number-of-elements'
                      placeholder='number-of-elements'
                      onChange={(e) => setNumOfNodes(e.target.value)}
                    ></input>
                  <button name='generateButton' onClick={handleGenerateTree}>
                    GENERATE
                  </button>
                  {/* <div className='shaffle-order'>{`Insert Order: ${shaffledArr}`}</div> */}
            </div>

            <div className='operation'>
                <label name='numberToInsertLabel' htmlFor='number-to-insert'>
                    Enter A Node To Insert
                  </label>
                  <input
                    type='number'
                    name='numberToInsert'
                    value={numToInsert}
                    id='number-to-insert'
                    placeholder='number to insert'
                    onChange={(e) => setNumToInsert(e.target.value)}
                  ></input>
                  <button name='insertButton' onClick={handleInsert}>
                    INSERT
                  </button>
            </div>

            <div className='operation'>
                <label htmlFor='number-to-delete'>Enter A Node To Delete</label>
                  <input
                    type='number'
                    value={numToDelete}
                    id='number-to-delete'
                    placeholder='number to delete'
                    onChange={(e) => setNumToDelete(e.target.value)}
                  ></input>
                  <button onClick={handleDelete}>DELETE</button>
            </div>

            <div className='operation'>
                  <label htmlFor='number-to-search'>Enter A Node To Seach</label>
                    <input
                      type='number'
                      value={numToSearch}
                      id='number-to-search'
                      placeholder='number to search'
                      onChange={(e) => setNumToSearch(e.target.value)}
                    ></input>
                    <button onClick={handleSearch}>SEARCH</button>
                    <span className={`search-res ${doExistCSS}`}>
                      <div className='search-res-cont'>{ searchResult[1] ? `Found ${searchResult[0]}`: `Not Found ${searchResult[0]}`}</div>
                    </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
