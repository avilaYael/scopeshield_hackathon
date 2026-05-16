'use client';

import { useState } from 'react';

export default function TestPage() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log('Button clicked!');
    setCount(count + 1);
    alert('Button works! Count: ' + (count + 1));
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Test Page</h1>
      <p>Count: {count}</p>
      <button 
        onClick={handleClick}
        style={{
          padding: '20px 40px',
          fontSize: '20px',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Click Me
      </button>
    </div>
  );
}

// Made with Bob
