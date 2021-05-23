import React from "react";
import style from "../styles/modules/Footer.module.scss";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
    return (
        <footer className={style.wrapper}>
            <span className={style.copy}>{`Todo List © ${new Date().getFullYear()}`}</span>
        </footer>
    );
};

export default Footer;
