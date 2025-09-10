import TreeGenerator from './TreeGenerator';
import { useState } from 'react';
import KeyInput from './KeyInput';
import Tree from './Tree';
import styles from './App.module.css';

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

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Decision Tree Generator</h1>
          <p className={styles.subtitle}>Transform complex decisions into clear, visual pathways</p>
        </header>

        {openRouterKeyState === null ? (
          <KeyInput setKey={initializeKey} />
        ) : (
          <div className={styles.controlPanel}>
            <div className={styles.keySection}>
              <div className={styles.keyInfo}>
                <div className={styles.keyIcon}></div>
                <span>OpenRouter API Key Connected</span>
              </div>
              <button 
                className={styles.changeKeyBtn} 
                onClick={() => setOpenRouterKey(null)}
              >
                Change API Key
              </button>
            </div>
            
            <div className={styles.treeNavigation}>
              <h3 className={styles.navigationHeader}>
                <div className={styles.navigationIcon}>🌳</div>
                Your Decision Trees
              </h3>
              <div className={styles.treeButtons}>
                {[...Array(existingNumOfTrees)].map((value, index) => (
                  <button 
                    key={index}
                    className={`${styles.treeButton} ${indexOfTreeShown === index ? styles.active : ''}`}
                    onClick={() => setIndexOfTreeShown(index)}
                  >
                    Tree {index + 1}
                  </button>
                ))}
                <button 
                  className={`${styles.treeButton} ${styles.newTreeButton} ${indexOfTreeShown === existingNumOfTrees ? styles.active : ''}`}
                  onClick={() => setIndexOfTreeShown(existingNumOfTrees)}
                >
                  + Create New
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.contentArea}>
          {indexOfTreeShown !== -1 && (
            (indexOfTreeShown < existingNumOfTrees && (
              <Tree nodes={JSON.parse(localStorage.getItem(String(indexOfTreeShown)))} />
            )) ||
            (indexOfTreeShown === existingNumOfTrees && (
              <TreeGenerator addNewTree={(nodes) => { addNewTree(nodes) }} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
