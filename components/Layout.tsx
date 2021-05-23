import React, { ReactNode } from "react";
import Head from "next/head";
import Wrapper, { WrapperSize } from "./Wrapper";
import style from "../styles/modules/Layout.module.scss";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
    children?: ReactNode;
    title?: string;
    size: WrapperSize;
};

const Layout = ({ children, title, size = "small" }: Props) => (
    <div className={style.background}>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <Header size={size} />
        <Wrapper size={size}>{children}</Wrapper>
        <Footer />
    </div>
);

export default Layout;
