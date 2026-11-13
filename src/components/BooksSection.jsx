import React, { useState } from 'react';
import '../styles/BooksSection.css';

// Import real book cover images from assets
import hookedCover from '../assets/books cover/hooked.webp';
import designAsArtCover from '../assets/books cover/design as art.webp';
import creativeConfidenceCover from '../assets/books cover/creative confidance.webp';
import historyofGraphicsCover from '../assets/books cover/history of graphics design.webp';
import shoeDogCover from '../assets/books cover/shoe dog.webp';
import thinkingFastSlowCover from '../assets/books cover/thinking fast and slow.webp';

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
    title: 'History of Graphics Design',
    coverImage: historyofGraphicsCover,
    patternType: 'mint-pattern',
    insideTitle: 'History of Graphics Design',
    insideAuthor: 'Philip B. Meggs',
    insideExcerpt: 'Design is the power of intention. The intention to make order out of chaos, to create structure out of randomness, and to bring clarity out of ambiguity.',
    tag: 'Graphic Design History'
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
    title: 'Shoe Dog',
    coverImage: shoeDogCover,
    patternType: 'red-door',
    insideTitle: 'Shoe Dog',
    insideAuthor: 'Phil Knight',
    insideExcerpt: 'It’s hard to do when you’re trying to do everything yourself. But you’re not alone. You have your team. You have your friends. You have your family.',
    tag: 'Entrepreneurship'
  },
  {
    id: 6,
    title: 'Thinking, Fast and Slow',
    coverImage: thinkingFastSlowCover,
    patternType: 'gold-dots',
    insideTitle: 'Thinking, Fast and Slow',
    insideAuthor: 'Daniel Kahneman',
    insideExcerpt: 'We are prone to overestimate how much we understand about the world and to underestimate the role of chance in events.',
    tag: 'Cognitive Psychology'
  }
];

export default function BooksSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate books 3 times for 100% seamless, gap-free infinite carousel loop
  const carouselBooks = [...booksData, ...booksData, ...booksData];

  return (
    <section className="books-section">
      <div className="books-container">

        <div className="books-header-wrapper">
          <h2 className="books-title">What's on my bookshelf</h2>
          <p className='books-details'>
            Books that shaped how I think. I finished most of them. Okay, some of them.
          </p>
        </div>

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
