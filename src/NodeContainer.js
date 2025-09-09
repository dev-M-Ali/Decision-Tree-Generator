import { memo } from "react";
import styles from "./NodeContainer.module.css";

function NodeContainer(props) {
    return <div>
        <h3 className={styles.node}>{props.content}</h3>
    </div>
}

export default memo(NodeContainer)