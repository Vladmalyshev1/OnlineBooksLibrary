import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../api';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  isFree: boolean;
}

interface BookListProps {
  searchQuery: string;
  accessFilter: 'all' | 'free' | 'paid';
}

const BookList: React.FC<BookListProps> = ({ searchQuery, accessFilter }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        setError('Не удалось загрузить книги');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    let filtered = books;

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerCaseQuery) ||
          book.author.toLowerCase().includes(lowerCaseQuery) ||
          book.category.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (accessFilter === 'free') {
      filtered = filtered.filter((book) => book.isFree);
    } else if (accessFilter === 'paid') {
      filtered = filtered.filter((book) => !book.isFree);
    }

    setFilteredBooks(filtered);
  }, [searchQuery, accessFilter, books]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className="book-list">
      {filteredBooks.map((book) => (
        <li key={book.id} className="book-item">
          <Link to={`/book/${book.id}`}>
            <h2>{book.title}</h2>
            <p>Автор: {book.author} ({book.category})</p>
            <p>
              Доступ: {book.isFree ? 'Бесплатно' : 'Платно'}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BookList;