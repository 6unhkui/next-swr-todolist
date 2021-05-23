import React from "react";
import style from "../styles/modules/Wrapper.module.scss";

export type WrapperSize = "small" | "medium";

interface WrapperProps {
    size: WrapperSize;
}

const Wrapper: React.FC<WrapperProps> = ({ size, children }) => {
    return <main className={`${style.wrapper} ${size === "small" ? style.small : style.medium}`}>{children}</main>;
};

export default Wrapper;
