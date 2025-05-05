import React from 'react';

interface BookDetailsProps {
  title: string;
  author: string;
  annotation: string;
}

const BookDetails: React.FC<BookDetailsProps> = ({ title, author, annotation }) => {
  return (
    <div className="book-details">
      <h1>{title}</h1>
      <p>Author: {author}</p>
      <p>{annotation}</p>
    </div>
  );
};

export default BookDetails;