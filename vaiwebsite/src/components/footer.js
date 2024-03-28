import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import logo from '../components/images/logo.jpg';

const FooterContainer = styled('footer')({
  backgroundColor: '#17202A', // Change background color to black
  color: '#fff',
  textAlign: 'center',
  padding: '20px', // Adjust padding
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
  gap: '5px',
});

const Subfooter = styled('div')({
  backgroundColor: '#17202A', // Change background color to black
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
  fontSize: '12px',
});

const Logo = styled('img')({
  height: '50px',
  width: 'auto',
  marginBottom: '20px',
});

const Heading = styled('h3')({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '10px',
});

const Description = styled('p')({
  fontSize: '1rem',
  lineHeight: '1.5',
});

const SocialIcons = styled('div')({
  '& > *': {
    margin: '0 10px',
    fontSize: '1.8rem',
    color: '#fff',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#ffd700',
    },
  },
});

const ContactUs = styled('div')({
  '& svg': {
    fontSize: '2rem',
    marginBottom: '10px',
  },
});

const SubscriptionForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const EmailInput = styled('input')({
  padding: '10px',
  marginBottom: '10px',
  width: '250px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
});

const SubscribeButton = styled('button')({
  padding: '10px 20px',
  backgroundColor: '#800080',
  color: '#fff',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#d81b60',
  },
});


const Footer = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://aiwebsite-backend.onrender.com/emails', { email });
      // Handle success, maybe show a confirmation message
      console.log('Email subscribed successfully');
      setEmail('');
    } catch (error) {
      // Handle error, maybe show an error message
      console.error('Error subscribing email:', error);
    }
  };

  return (
    <>
      <FooterContainer>
        <div>
          <Logo src={logo} alt="Logo" />
          <Heading>AI website</Heading>
          <Description>
            AI website is a website dedicated to providing a comprehensive list of AI tools to assist individuals and
            businesses in finding the most suitable AI tool for their specific requirements.
          </Description>
        </div>

        <div>
          <SocialIcons>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </SocialIcons>
        </div>

        <div>
          <ContactUs>
            <FaEnvelope />
            <Heading>Contact Us</Heading>
            <Description>
              Email: <a href="#">contact us</a>
            </Description>
          </ContactUs>
        </div>

        <div>
          <SubscriptionForm onSubmit={handleSubmit}>
            <Heading>SUBSCRIBE</Heading>
            <Description>
              AI website is a website dedicated to providing a comprehensive list of AI tools to assist individuals and
              businesses in finding the most suitable AI tool for their specific requirements.
            </Description>
            <EmailInput
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
            />
            <SubscribeButton type="submit">Subscribe</SubscribeButton>
          </SubscriptionForm>
        </div>
      </FooterContainer>
      <Subfooter>
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </Subfooter>
    </>
  );
};

export default Footer;
