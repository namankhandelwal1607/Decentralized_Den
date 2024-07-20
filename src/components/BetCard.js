// src/components/BetCard.js

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Popup from './Popup'; // Adjust the import path as necessary

const BetCard = (props) => {
  const { provider, signer, contractBet } = props;
  const [price, setPrice] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState('');

  useEffect(() => {
    const fetchCoinData = async () => {
      if (props.name) {
        // Fetch coin data (implement your logic here)
      }
    };

    fetchCoinData();
  }, [props.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBetClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePopupSubmit = async (e) => {
    e.preventDefault();
    
    if (!contractBet) {
      console.error('Contract not initialized');
      return;
    }
    
    try {
      const estimate = ethers.utils.parseUnits(estimatedPrice, 'ether'); // Assuming estimatedPrice is in ether
      const tx = await contractBet.setBet(props.address, estimate, { value: ethers.utils.parseUnits(props.Bet_Price, 'ether') });
      await tx.wait();
      console.log('Bet placed successfully');
    } catch (error) {
      console.error('Error placing bet:', error);
    } finally {
      setIsPopupOpen(false);
    }
  };

  return (
    <div className="flex m-5">
      <div className="bg-gray-200 shadow-md rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-2 flex font-bold">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name: </label>
            <label className='text-cyan mx-2'>{props.name}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="symbol">Symbol: </label>
            <label className='text-cyan mx-2'>{props.symbol}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Current Price: </label>
            <label className='text-cyan mx-2'>{price || 'Fetching...'}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="opening">Opening Time: </label>
            <label className='text-cyan mx-2'>{props.opening}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="closing">Closing Time: </label>
            <label className='text-cyan mx-2'>{props.closing}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="result">Result Time: </label>
            <label className='text-cyan mx-2'>{props.result}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Bet_Price">Bet Price:</label>
            <label className='text-cyan mx-2'>{props.Bet_Price}</label>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleBetClick}
              className="bg-cyan hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Place Bet
            </button>
          </div>
        </form>

        {isPopupOpen && (
          <Popup
            estimatedPrice={estimatedPrice}
            setEstimatedPrice={setEstimatedPrice}
            onClose={handleClosePopup}
            onSubmit={handlePopupSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default BetCard;
