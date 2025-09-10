import { useRef } from "react"
import styles from './KeyInput.module.css';

function KeyInput(props) {
    const enteredKey = useRef()

    return (
        <div className={styles.keyInputContainer}>
            <div className={styles.keyInputHeader}>
                <h2 className={styles.keyInputTitle}>Welcome to Decision Tree Generator</h2>
                <p className={styles.keyInputDescription}>
                    Please enter your OpenRouter API key to get started with creating intelligent decision trees
                </p>
            </div>
            
            <div className={styles.inputGroup}>
                <input 
                    type="text" 
                    placeholder="Enter your OpenRouter API key" 
                    ref={enteredKey}
                    className={styles.keyInput}
                />
                <button 
                    onClick={() => { props.setKey(enteredKey.current.value) }}
                    className={styles.submitButton}
                >
                    Get Started
                </button>
            </div>
            
            <div className={styles.securityNote}>
                <span className={styles.securityIcon}>🔒</span>
                Your API key is stored locally and never shared with third parties
            </div>
        </div>
    )
}

export default KeyInput;