'use client';
import React, { useState } from 'react';

const WebCrawlerAPI = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [apiEndpoint, setApiEndpoint] = useState('/api/v1/indiamart/search');
  const [loading, setLoading] = useState(false);

  const apiBaseURL = 'https://sih-webcrawler.vercel.app'; // Base URL for the API

  const handleSearch = async () => {
    if (!query.trim()) return alert('Please enter a query');

    setLoading(true);
    try {
      const response = await fetch(`${apiBaseURL}${apiEndpoint}?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pt-20 flex flex-col justify-center items-center min-h-screen' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Web Crawler API Usage</h1>
      <div>
        <label htmlFor="apiEndpoint">Select API Endpoint:</label>
        <select
          id="apiEndpoint"
          value={apiEndpoint}
          onChange={(e) => setApiEndpoint(e.target.value)}
        >
          <option value="/api/v1/indiamart/search">IndiaMart Search</option>
          <option value="/api/v1/tradeindia/search">TradeIndia Search</option>
          <option value="/api/v1/alibaba/search">Alibaba Search</option>
          <option value="/api/v1/amazon/search">Amazon Search (v1)</option>
          <option value="/api/v2/amazon/search">Amazon Search with Price History (v2)</option>
          <option value="/api/v1/gem/search">GeM Search</option>
          <option value="/api/v1/gem/products">GeM Products by Subcategory Slug</option>
          <option value="/api/services">Services Search</option>
        </select>
      </div>

      <div style={{ marginTop: '10px' }}>
        <label htmlFor="query">Search Query:</label>
        <input
          id="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
        />
      </div>

      <button
        onClick={handleSearch}
        style={{ marginTop: '10px', padding: '10px 20px', background: '#007BFF', color: '#FFF', border: 'none', cursor: 'pointer' }}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {results && (
        <div style={{ marginTop: '20px' }}>
          <h2>Results:</h2>
          <pre style={{ background: '#F8F8F8', padding: '10px', border: '1px solid #DDD' }}>
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default WebCrawlerAPI;
