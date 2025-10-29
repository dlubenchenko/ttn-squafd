import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className={styles.notFound}>
            <div style={{cursor: 'default', userSelect: 'none'}}>
                <div className={styles.emoji}>🕵️‍♂️</div>
                <h1>404</h1>
                <h2>Ой! Ви потрапили не туди...</h2>
                <p>
                    Можливо, ця сторінка втекла у відпустку?
                    <br />
                    Або просто заховалась від суворого TeamLead'а 😅
                </p>
            </div>
            <Button type="primary" size="large" onClick={() => navigate("/")}>
                На головну
            </Button>
        </div>
    );
}
