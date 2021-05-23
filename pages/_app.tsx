import { AppProps } from "next/app";
import { NextPage } from "next";
import { SWRConfig } from "swr";
import "reset-css";
import "../styles/_global.scss";
import Layout from "components/Layout";
import http from "../utils/http";

export type Fetcher<T> = (url: string) => Promise<T>;

export const fetcher = async (url: string) => {
    const resp = await http.get(url);
    return resp.data;
};

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
    return (
        <SWRConfig value={{ fetcher }}>
            <Layout size="small">
                <Component {...pageProps} />
            </Layout>
        </SWRConfig>
    );
};

export default MyApp;
