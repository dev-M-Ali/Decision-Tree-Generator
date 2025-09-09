import logo from './logo.svg';
import './App.css';
import TreeGenerator from './TreeGenerator';
import { useRef, useState } from 'react';
import KeyInput from './KeyInput';
import Tree from './Tree';

function App() {
  const [openRouterKeyState, setOpenRouterKey] = useState(localStorage.getItem('openRouterKey'))
  const [existingNumOfTrees, setExistingNumOfTrees] = useState(JSON.parse(localStorage.getItem('existingNumOfTrees')) || 0);
  const [indexOfTreeShown, setIndexOfTreeShown] = useState(-1)

  function initializeKey(key) {
    setOpenRouterKey(key)
    localStorage.setItem('openRouterKey', String(key))
  }

  function addNewTree(nodes)  //nodes is a JSON string (array containing nodes as JSON objects)
  {
    setExistingNumOfTrees(oldVal => {
      localStorage.setItem(oldVal, nodes)
      localStorage.setItem('existingNumOfTrees', oldVal + 1)
      return oldVal + 1
    })
  }

  // console.log("Index of tree shown is now: ", indexOfTreeShown)
  // console.log("Number of trees created yet is: ", treesCreated)
  //console.log(existingNumOfTrees)

  return (
    <div className="App">
      <h1>Decision Tree Generator</h1>

      {
        openRouterKeyState === null ?
          <KeyInput setKey={initializeKey} /> :
          <div>
            <button onClick={() => setOpenRouterKey(null)}>Change OpenRouter Key</button>
            <div>
              <h4>Previous trees: </h4>
              {
                [...Array(existingNumOfTrees)].map((value, index) => {
                  return <button onClick={() => setIndexOfTreeShown(index)}>{index + 1}</button>
                })
              }
              <button onClick={() => setIndexOfTreeShown(existingNumOfTrees)}>New</button>
            </div>
          </div>
      }

      {
        indexOfTreeShown !== -1 &&
        (
          (indexOfTreeShown < existingNumOfTrees && <Tree nodes={JSON.parse(localStorage.getItem(String(indexOfTreeShown)))} />) ||
          (indexOfTreeShown === existingNumOfTrees && <TreeGenerator addNewTree={(nodes) => { addNewTree(nodes) }} />)
        )
      }
    </div >
  );
}

export default App;
