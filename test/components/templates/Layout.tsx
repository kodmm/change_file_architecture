import { NextPage } from 'next';
import type { ReactElement } from 'react';
import { Header, Footer } from '../organisms';

type LayoutProps = Required<{
    readonly children: ReactElement,
}>
const Layout: NextPage<LayoutProps> = ({ children }: LayoutProps) => {
    return(
        <>
            <Header  />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export { Layout }