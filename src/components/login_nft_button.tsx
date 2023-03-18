import React, { useCallback, useState } from 'react';
import { isConnected, getNFT, getPublicKey } from '@gemwallet/api';

export default function LoginNftButton() {
  const [nfts, setNfts] = useState<unknown[]>();
  const [address, setAddress] = useState('');
  const [showAddress, setShowAddress] = useState(false);
  const [isGemWalletInstalled, setIsGemWalletInstalled] = useState<boolean>(true);

  const handleNFT = useCallback(async () => {
    const isConnectedGem = await isConnected();
    if (isConnectedGem) {
      const responsePublicKey = await getPublicKey();
      if (responsePublicKey) {
        const { address: addr, publicKey } = responsePublicKey;
        setAddress(addr);
        setShowAddress(true);
      }
      const nft = await getNFT();
      setNfts(nft || []);
      if (nfts?.length == 0) {
        alert('No NFTs found in your wallet');
      } else {
        alert('NFTs found in your wallet');
      }
    } else {
      setIsGemWalletInstalled(false);
    }
  }, []);

  return (
    <section>
      {!isGemWalletInstalled ? <div>Please install GemWallet</div> : null}
      <button type="button" class="connect_wallet" onClick={handleNFT}>
        Connect cash back program
      </button>
      {showAddress ? <p id="address">{address}</p> : null}
      {nfts !== undefined ? (
        <pre>
          <code>{JSON.stringify(nfts, null, 4)}</code>
        </pre>
      ) : null}
    </section>
  );
}
