import React, { useState } from 'react';
import '../styles/BooksSection.css';

// Import real book cover images from assets
import hookedCover from '../assets/books cover/hooked.jpg';
import designAsArtCover from '../assets/books cover/design-as-art.jpg';
import creativeConfidenceCover from '../assets/books cover/creative-confidance.jpg';

// SVG Data URIs for additional iconic book covers
const steveJobsCover = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 320" width="220" height="320">
  <rect width="220" height="320" fill="#ffffff"/>
  <rect x="0" y="0" width="6" height="320" fill="#e4e4e7"/>
  <text x="24" y="58" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#09090b">Steve Jobs</text>
  <text x="24" y="82" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#71717a">by Walter Isaacson</text>
  <g transform="translate(45, 115)" opacity="0.85">
    <path d="M65 20 C40 20 25 40 25 65 C25 85 35 100 65 100 C95 100 105 85 105 65 C105 40 90 20 65 20 Z" fill="#18181b"/>
    <path d="M30 110 C30 95 45 90 65 90 C85 90 100 95 100 110 L100 140 L30 140 Z" fill="#18181b"/>
    <circle cx="50" cy="55" r="7" fill="#ffffff"/>
    <circle cx="80" cy="55" r="7" fill="#ffffff"/>
    <rect x="42" y="52" width="46" height="3" fill="#18181b"/>
  </g>
  <text x="24" y="295" font-family="system-ui, sans-serif" font-size="9" letter-spacing="2" font-weight="bold" fill="#a1a1aa">SIMON &amp; SCHUSTER</text>
</svg>
`);

const normanCover = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 320" width="220" height="320">
  <rect width="220" height="320" fill="#c82333"/>
  <text x="20" y="38" font-family="system-ui, sans-serif" font-size="8.5" font-weight="bold" letter-spacing="1.5" fill="#ffffff" opacity="0.9">REVISED &amp; EXPANDED EDITION</text>
  <text x="20" y="78" font-family="Georgia, serif" font-size="26" font-weight="bold" fill="#ffffff">The Design</text>
  <text x="20" y="104" font-family="Georgia, serif" font-size="19" fill="#ffffff" opacity="0.95">of Everyday Things</text>
  <g transform="translate(65, 135)">
    <path d="M30 10 C15 10 5 25 5 45 C5 65 15 80 30 80 L60 80 C75 80 85 65 85 45 C85 25 75 10 60 10 Z" fill="none" stroke="#ffffff" stroke-width="4"/>
    <circle cx="45" cy="45" r="12" fill="none" stroke="#ffffff" stroke-width="3"/>
  </g>
  <text x="20" y="285" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#ffffff">Don Norman</text>
</svg>
`);

const atomicHabitsCover = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 320" width="220" height="320">
  <rect width="220" height="320" fill="#faf8f5"/>
  <g opacity="0.25">
    <circle cx="110" cy="160" r="80" fill="none" stroke="#d97706" stroke-width="1" stroke-dasharray="2,4"/>
    <circle cx="110" cy="160" r="60" fill="none" stroke="#d97706" stroke-width="1" stroke-dasharray="2,4"/>
    <circle cx="110" cy="160" r="40" fill="none" stroke="#d97706" stroke-width="1" stroke-dasharray="2,4"/>
  </g>
  <text x="24" y="70" font-family="Georgia, serif" font-size="32" font-weight="bold" fill="#d97706">Atomic</text>
  <text x="24" y="105" font-family="Georgia, serif" font-size="32" font-weight="bold" fill="#18181b">Habits</text>
  <text x="24" y="135" font-family="system-ui, sans-serif" font-size="9.5" fill="#52525b">An Easy &amp; Proven Way to Build Good Habits</text>
  <text x="24" y="148" font-family="system-ui, sans-serif" font-size="9.5" fill="#52525b">&amp; Break Bad Ones</text>
  <text x="24" y="285" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#18181b">James Clear</text>
</svg>
`);

const booksData = [
  {
    id: 1,
    title: 'HOOKED',
    coverImage: hookedCover,
    patternType: 'teal-wave',
    insideTitle: 'Hooked',
    insideAuthor: 'Nir Eyal',
    insideExcerpt: 'Building habit-forming products means connecting a user\'s problem to your solution with enough frequency to make it an automatic behavior.',
    tag: 'Product Psychology'
  },
  {
    id: 2,
    title: 'Steve Jobs',
    coverImage: steveJobsCover,
    patternType: 'mint-pattern',
    insideTitle: 'Steve Jobs',
    insideAuthor: 'Walter Isaacson',
    insideExcerpt: 'People who are crazy enough to think they can change the world are the ones who do.',
    tag: 'Biography & Leadership'
  },
  {
    id: 3,
    title: 'Design as Art',
    coverImage: designAsArtCover,
    patternType: 'grid-faces',
    insideTitle: 'Design as Art',
    insideAuthor: 'Bruno Munari',
    insideExcerpt: 'When the objects we use every day and the surroundings we live in have become in themselves a work of art, then we shall be able to say that we have achieved a balanced life.',
    tag: 'Visual Thinking'
  },
  {
    id: 4,
    title: 'Creative Confidence',
    coverImage: creativeConfidenceCover,
    patternType: 'mint-pattern',
    insideTitle: 'Creative Confidence',
    insideAuthor: 'Tom & David Kelley',
    insideExcerpt: 'Creative confidence is a belief in your ability to create change in the world around you. It is the conviction that you can achieve what you set out to do.',
    tag: 'Innovation & Design'
  },
  {
    id: 5,
    title: 'The Design of Everyday Things',
    coverImage: normanCover,
    patternType: 'red-door',
    insideTitle: 'Everyday Things',
    insideAuthor: 'Don Norman',
    insideExcerpt: 'Two of the most important characteristics of good design are discoverability and understanding.',
    tag: 'User Experience'
  },
  {
    id: 6,
    title: 'Atomic Habits',
    coverImage: atomicHabitsCover,
    patternType: 'gold-dots',
    insideTitle: 'Atomic Habits',
    insideAuthor: 'James Clear',
    insideExcerpt: 'You do not rise to the level of your goals. You fall to the level of your systems.',
    tag: 'Behavioral Design'
  }
];

export default function BooksSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate books 3 times for 100% seamless, gap-free infinite carousel loop
  const carouselBooks = [...booksData, ...booksData, ...booksData];

  return (
    <section className="books-section">
      <div className="books-container">
        <h2 className="books-title">How I get inspired?</h2>

        <div 
          className={`books-carousel-wrapper ${isPaused ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="books-track">
            {carouselBooks.map((book, index) => (
              <div 
                key={`${book.id}-${index}`} 
                className="book-item-wrapper"
              >
                <div className="book-3d">
                  {/* Inside Page (Revealed when cover opens) */}
                  <div className="book-page-inside">
                    <div className="inside-page-spine-shadow"></div>
                    <div className="inside-page-header">
                      <span className="inside-tag">{book.tag}</span>
                    </div>
                    <div className="inside-page-content">
                      <h4 className="inside-book-title">{book.insideTitle}</h4>
                      <p className="inside-book-author">{book.insideAuthor}</p>
                      <div className="inside-divider"></div>
                      <p className="inside-excerpt">"{book.insideExcerpt}"</p>
                    </div>
                    <div className="inside-page-footer">
                      <span>PAGE 1</span>
                    </div>
                  </div>

                  {/* Front Cover (Rotates open in 3D on hover) */}
                  <div className="book-cover-wrapper">
                    {/* Front Face of Cover with actual Book Cover Image */}
                    <div className="cover-front">
                      <img 
                        src={book.coverImage} 
                        alt={book.title} 
                        className="book-cover-img" 
                      />
                      {/* Book spine edge accent */}
                      <div className="cover-spine-shadow"></div>
                    </div>

                    {/* Back Face of Cover (Plain simple white inner lining when open) */}
                    <div className="cover-back">
                      <div className="cover-back-shadow"></div>
                    </div>
                  </div>

                  {/* 3D Book Thickness Edge Effects */}
                  <div className="book-spine-side"></div>
                  <div className="book-pages-top"></div>
                  <div className="book-pages-right"></div>
                  <div className="book-drop-shadow"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
