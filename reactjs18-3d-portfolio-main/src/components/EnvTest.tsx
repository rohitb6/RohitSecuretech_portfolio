import React from 'react';

const EnvTest = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px',
      zIndex: 1000,
      fontSize: '12px',
      maxWidth: '300px'
    }}>
      <h3>Environment Variables Status</h3>
      <p>VITE_EMAILJS_SERVICE_ID: {import.meta.env.VITE_EMAILJS_SERVICE_ID ? '✅ Set' : '❌ Missing'}</p>
      <p>VITE_EMAILJS_TEMPLATE_ID: {import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? '✅ Set' : '❌ Missing'}</p>
      <p>VITE_EMAILJS_ACCESS_TOKEN: {import.meta.env.VITE_EMAILJS_ACCESS_TOKEN ? '✅ Set' : '❌ Missing'}</p>
      <p><small>Note: This is only visible in development</small></p>
    </div>
  );
};

export default EnvTest;
