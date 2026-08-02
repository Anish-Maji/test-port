import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import '../styles/CinematicBrainSection.css';

import post1 from '../assets/instagram/post 1.webp';
import post2 from '../assets/instagram/post 2.webp';
import post3 from '../assets/instagram/post 3.webp';
import post4 from '../assets/instagram/post 4.webp';
import post5 from '../assets/instagram/post 5.webp';

const InstagramIcon = ({ size = 14, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// 5 Static Data Slots (username, location, image, caption, likes, comments)
const cinematicPostsData = [
  {
    id: 1,
    username: '@anishmaji_',
    location: 'Dharmashala, India',
    image: post1,
    caption: 'Some places dont ask for anything more, but tell you to slow down a bit.Take a pause. Visit yourself. 🤍 #dharmashala #tours #indiareels',
    likes: '60',
    comments: '11',
    postUrl: 'https://www.instagram.com/p/DaqfyBJwUDo/'
  },
  {
    id: 2,
    username: '@anishmaji_',
    location: 'Andaman and Nicobar Islands, India',
    image: post2,
    caption: 'Felt like posting again.. Kuchh kuchh lambhe bina awas ke bhi yaad rahta hai....',
    likes: '86',
    comments: '3',
    postUrl: 'https://www.instagram.com/p/DUgT6yPErPb/'
  },
  {
    id: 3,
    username: '@anishmaji_',
    location: 'Yamuna, Delhi',
    image: post3,
    caption: 'Lets bring back the colors for my little section by the Yamuna....',
    likes: '72',
    comments: '2',
    postUrl: 'https://www.instagram.com/p/DGppLd6yu1w/'
  },
  {
    id: 4,
    username: '@anishmaji_',
    location: 'Kolkata, India',
    image: post4,
    caption: 'chai n u.. ',
    likes: '44',
    comments: '4',
    postUrl: 'https://www.instagram.com/p/DFLIH1ryShS/'
  },
  {
    id: 5,
    username: '@anishmaji_',
    location: 'Delhi, India',
    image: post5,
    caption: 'With proper space, even the smallest things can appear the most beautiful..',
    likes: '50',
    comments: '2',
    postUrl: 'https://www.instagram.com/p/DDxN1iASz8l/'
  }
];

export default function CinematicBrainSection() {
  return (
    <section className="cinematic-section" id="cinematic-brain">
      <div className="cinematic-container">

        {/* Header Section */}
        <div className="cinematic-header-wrapper">
          <h2 className="cinematic-title">director's cut</h2>
          <p className="cinematic-details">

          </p>
        </div>

        {/* 5 Static Cards Grid Layout (Non-scrollable) */}
        <div className="cinematic-grid">
          {cinematicPostsData.map((post) => (
            <a
              key={post.id}
              href={post.postUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-card"
            >
              {/* Header Slot: Username & Location */}
              <div className="ig-card-header">
                <div className="ig-user-info">
                  <span className="ig-username">{post.username}</span>
                  {post.location && <span className="ig-location">{post.location}</span>}
                </div>
                <InstagramIcon size={14} className="ig-icon" />
              </div>

              {/* Media Image Slot */}
              <div className="ig-media-box">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="ig-media-img"
                  loading="lazy"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", justifyContent: "space-evenly" }}>
                {/* Caption Slot */}
                <div className="ig-caption-box">
                  <p className="ig-caption">{post.caption}</p>
                </div>

                {/* Metrics Slot: Likes & Comments */}
                <div className="ig-card-footer">
                  <div className="ig-metric">
                    <Heart size={13} className="metric-icon heart" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="ig-metric">
                    <MessageCircle size={13} className="metric-icon comment" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
