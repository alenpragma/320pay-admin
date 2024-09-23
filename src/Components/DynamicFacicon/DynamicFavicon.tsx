import React, { useEffect } from 'react';
import axios from 'axios';

const DynamicFavicon = () => {
  useEffect(() => {
    // Fetch favicon URL from API
    const fetchFavicon = async () => {
      try {
        const response = await axios.get('https://web3.blockmaster.info/settings'); // Replace with your API URL
        console.log(response);
        const faviconUrl = response.data.faviconUrl; // Assuming the API returns a 'faviconUrl'
        updateFavicon(faviconUrl);
      } catch (error) {
        console.error('Error fetching favicon:', error);
      }
    };

    fetchFavicon();
  }, []);

  const updateFavicon = (faviconUrl: string) => {
    const link =
      document.querySelector("link[rel~='icon']") ||
      document.createElement('link');
    link.rel = 'icon';
    link.href = faviconUrl;
    document.head.appendChild(link);
  };

  return null; // No need to render anything for the favicon update
};

export default DynamicFavicon;
