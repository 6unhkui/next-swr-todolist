import Link from "next/link";
import React from "react";
import style from "../styles/modules/Header.module.scss";
import { WrapperSize } from "./Wrapper";

interface HeaderProps {
    size: WrapperSize;
}

const Header: React.FC<HeaderProps> = ({ size }) => {
    return (
        <header className={`${style.wrapper} ${size === "small" ? style.small : style.medium}`}>
            <nav>
                <Link href="/">
                    <span className={style.navItem}>Todo List 🔥</span>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
