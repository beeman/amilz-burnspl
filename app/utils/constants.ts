import { clusterApiUrl, PublicKey } from "@solana/web3.js"

export const PROGRAM_ID = new PublicKey('FiRESpaNzgYUiba5vkb44CZJLZjrux1AUECdfwPRsNkg');
export const TOKEN_MINT = new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263');
export const SOLANA_RPC: string = process.env.REACT_APP_SOLANA_RPC_HOST as string;
export const FUNGIBLE_USER_SEED = 'fungibleuser';