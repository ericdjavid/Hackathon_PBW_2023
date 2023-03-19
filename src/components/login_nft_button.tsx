import React, { useCallback, useEffect, useState } from 'react';
import { isConnected, getNFT, getPublicKey } from '@gemwallet/api';
import Cookies from 'js-cookie';
import {  convertHexToString } from 'xrpl'
import Image from 'next/image';

export default function LoginNftButton() {
  const [myNft, setMyNft]: any = useState("");
  const [address, setAddress] = useState('');
  const [showAddress, setShowAddress] = useState(false);
  const [isGemWalletInstalled, setIsGemWalletInstalled] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Récupérer l'adresse du wallet de l'utilisateur depuis le cookie
    const walletAddress: any = Cookies.get('walletAddress') || null;
    const myNft = Cookies.get('nfts');
    console.log(myNft)
    setMyNft(myNft);

    if (walletAddress != null) {
      setAddress(walletAddress)
      setShowAddress(true);
      isConnected().then((isConnected) => {
        if (isConnected && myNft == null) {
          getNFT().then((trHash: any) => {
            console.log("Your NFTs: ", trHash);
            Cookies.set('nfts', convertHexToString(trHash[0].URI).slice(7));
            setMyNft(convertHexToString(trHash[0].URI).slice(7))
            console.log(myNft)
          });
        }
      });
    }
    console.log(myNft)
    console.log(walletAddress)
  }, [setAddress])

  async function handleNFT() {
    const isConnectedGem = await isConnected();
    if (isConnectedGem) {
      const responsePublicKey = await getPublicKey();
      if (responsePublicKey) {
        const { address: addr, publicKey } = responsePublicKey;
        setAddress(addr);
        Cookies.set('walletAddress', addr);
        setShowAddress(true);
      }

    } else {
      setIsGemWalletInstalled(false);
    }
  }

  return (
    <div>
      <button
        onClick={showAddress ? (() => setOpen(!open)) : handleNFT}
        className="connect_wallet text-white font-bold py-1 px-1 rounded-full absolute top-5 right-5 z-20">
        {showAddress ? <div className='flex align-middle m-auto'>
          <div className="bg-gray-200 rounded-full w-17 h-14 border border-gray-200">
  <Image src="/img/Sato.webp" alt="Avatar" className="rounded-full w-full h-full object-cover " width={50} height={50}/>
</div>
           <div className='w-full h-full my-auto'>
            {address?.slice(0, 10) + "..."}
            </div>
            </div> : <div>Connect Wallet</div>}
      </button>
      {
        open && (
          <div className="absolute align-middle top-20 right-0 mt-4 mr-4 flex flex-col gap-y-2 items-center rounded-md p-5 border border-gray-400">
            {/* <div>
              <span className="text-gray-400 text-sm mr-2">Balance:</span>
              <span className="text-white font-medium text-sm mr-4">$12,345.67</span>
            </div> */}
            <button className="connect_wallet text-white font-medium py-1 px-2 rounded-full">
              Déconnexion
            </button>
            <span className="text-gray-400 text-md font-bold m-2">NFT</span>
            {myNft != "" && (<>
              {/* <Image src="https://ipfs.bithomp.com/image/QmXSidVfGe24KazE9nWQHm3Y51g82jXnKajcEYdFLCpaCS" width={100} height={100} alt="Avatar" className="w-20 h-20 rounded-md border border-gray-400" /> */}
              <Image src={`https://ipfs.bithomp.com/image/${myNft}`} width={100} height={100} alt="Avatar" className="w-20 h-20 rounded-md border border-gray-400" />
            </>)}
          </div>
        )
      }
    </div>
  );
}
