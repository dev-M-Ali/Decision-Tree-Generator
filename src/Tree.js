import NodeContainer from "./NodeContainer"
import { memo } from "react"

function Tree(props) {
    return <div>
        {
            props.nodes.map(elem => {
                return <NodeContainer content={elem.content} />
            })
        }
    </div>
}

export default memo(Tree)