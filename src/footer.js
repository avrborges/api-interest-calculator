import React from 'react';

const Footer = () => {

    const year = new Date().getFullYear();
  
    return <footer>{`Powered by Financial Services | ${year}`}</footer>;
  };
  
  export default Footer;