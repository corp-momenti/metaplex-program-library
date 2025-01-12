import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';

import * as splToken from '@solana/spl-token';

export type SellInstructionArgs = {
  tradeStateBump: number;
  freeTradeStateBump: number;
  programAsSignerBump: number;
  buyerPrice: beet.bignum;
  tokenSize: beet.bignum;
};
const sellStruct = new beet.BeetArgsStruct<
  SellInstructionArgs & {
    instructionDiscriminator: number[];
  }
>(
  [
    ['instructionDiscriminator', beet.fixedSizeArray(beet.u8, 8)],
    ['tradeStateBump', beet.u8],
    ['freeTradeStateBump', beet.u8],
    ['programAsSignerBump', beet.u8],
    ['buyerPrice', beet.u64],
    ['tokenSize', beet.u64],
  ],
  'SellInstructionArgs',
);
export type SellInstructionAccounts = {
  wallet: web3.PublicKey;
  tokenAccount: web3.PublicKey;
  metadata: web3.PublicKey;
  authority: web3.PublicKey;
  auctionHouse: web3.PublicKey;
  auctionHouseFeeAccount: web3.PublicKey;
  sellerTradeState: web3.PublicKey;
  freeSellerTradeState: web3.PublicKey;
  programAsSigner: web3.PublicKey;
};

const sellInstructionDiscriminator = [51, 230, 133, 164, 1, 127, 131, 173];

export function createSellInstruction(
  accounts: SellInstructionAccounts,
  args: SellInstructionArgs,
) {
  const {
    wallet,
    tokenAccount,
    metadata,
    authority,
    auctionHouse,
    auctionHouseFeeAccount,
    sellerTradeState,
    freeSellerTradeState,
    programAsSigner,
  } = accounts;

  const [data] = sellStruct.serialize({
    instructionDiscriminator: sellInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: wallet,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: tokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: metadata,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: authority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: auctionHouse,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: auctionHouseFeeAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: sellerTradeState,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: freeSellerTradeState,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: programAsSigner,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey('hausMo3jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk'),
    keys,
    data,
  });
  return ix;
}
