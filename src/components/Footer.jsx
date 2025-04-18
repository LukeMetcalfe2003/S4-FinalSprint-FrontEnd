import React from 'react';

const Footer = () => {
    return (
        <footer className='footer-container'>
            <p><span className='boldcopyright'> &copy; {new Date().getFullYear()}</span></p>
            <a href='#top' className='footer-link'>Top of Page</a>
        </footer>
    )
};

export default Footer;