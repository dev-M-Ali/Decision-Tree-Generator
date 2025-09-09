import { useRef } from "react"

function KeyInput(props) {
    const enteredKey = useRef()

    return < div >
        <input type="text" placeholder='Please enter your OpenRouter key' ref={enteredKey} />
        <button onClick={() => { props.setKey(enteredKey.current.value) }}>Enter</button>
    </ div>
}

export default KeyInput;