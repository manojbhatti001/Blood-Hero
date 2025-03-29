import React from 'react';

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/blood-donation',
      icon: '/images/linkedin.png'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: '/images/twitter.png'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: '/images/instagram.png'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      icon: '/images/youtube.png'
    }
  ];

  return (
    <div className="flex space-x-6">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-110 transition-transform duration-300"
        >
          <img
            src={social.icon}
            alt={social.name}
            className="w-8 h-8"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
