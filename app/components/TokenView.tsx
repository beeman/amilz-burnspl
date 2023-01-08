import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { getTokenBalance } from '../utils/solana'
import BurnTable from './BurnTable'
import NavBar from './NavBar'
import Logo from '../public/bonklogo.webp';
import Image from "next/image";
import TotalTokensBurned from './TotalTokensBurned';
import { MintWithMetadata } from '../utils/metaplex'

interface TokenViewProps {
    tokenData: MintWithMetadata
}

export const TokenView: FC<TokenViewProps> = (props: TokenViewProps) => {
    const [solBalance, setSolBalance] = useState<number>(0);
    const [tokenBalance, setTokenBalance] = useState<number>(0);
    const [refreshSol, refreshSolTrigger] = useState<boolean>(false);
    const [refreshToken, refreshTokenTrigger] = useState<boolean>(false);
    const [totalBurn, setTotalBurn] = useState<number>(0);
    const { publicKey } = useWallet();
    const { connection } = useConnection();

    useEffect(() => {
        if (!publicKey) {
            setTokenBalance(0); // if user disconnects wallet, reset a 0 balance
            return;
        };
        (async () => {
            try {
                let tokenBalance = await getTokenBalance(publicKey, connection, props.tokenData.mint);
                setTokenBalance(tokenBalance);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [publicKey, connection, refreshToken])

    return (
        <div className={styles.container}>
            <Head>
                <title>The Bonk Fire</title>
                <meta name="description" content={`Track BONK Burns`} />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
            </Head>
            <main className={styles.main}>
                <NavBar tokenBalance={tokenBalance} tokenSymbol={props.tokenData.symbol} />
                {props.tokenData.img ? <Image src={props.tokenData.img} className='on-top' style={{borderRadius: '50%'}} height={200} width={200} alt={props.tokenData.name || props.tokenData.mint.toBase58()} /> : <></>}
                <TotalTokensBurned tokenData={props.tokenData} tokensBurned={totalBurn} />
                <BurnTable tokenData={props.tokenData} updateTotalBurn={(amt) => { setTotalBurn(amt) }} />
            </main>
            {/* <Footer /> */}
        </div>
    )
}