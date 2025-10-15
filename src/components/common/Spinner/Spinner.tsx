import { Spin as AntSpin } from "antd";

import styles from './Spinner.module.scss'

export default function Spinner() {
    return (
        <div className={styles.spinner}>
            <AntSpin size="large" />
        </div>
    )
}
