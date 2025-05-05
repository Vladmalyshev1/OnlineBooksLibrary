import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBookById, fetchBooksByIds, savePurchaseRequest } from '../api';
import ReadingWidget from '../components/ReadingWidget';
import '../styles.css';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  isFree: boolean;
  annotation: string;
  relatedBooks: number[];
  content: string;
}

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const bookId = Number(id);
        if (isNaN(bookId)) {
          throw new Error('Некорректный ID книги');
        }

        const data = await fetchBookById(bookId);
        setBook(data);

        if (data.relatedBooks.length > 0) {
          const relatedData = await fetchBooksByIds(data.relatedBooks);
          setRelatedBooks(relatedData);
        }
      } catch (err: any) {
        setError(err.message || 'Не удалось загрузить информацию о книге');
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  const handlePurchase = async (contactInfo: string) => {
    try {
      await savePurchaseRequest({ bookId: book!.id, contactInfo });
      alert('Запрос на покупку отправлен!');
    } catch (err) {
      alert('Не удалось отправить запрос на покупку.');
    }
  };

  return (
    <div className="book-page">
    <h1>{book?.title}</h1>
    <p>Автор: {book?.author}</p>
    <p>Категория: {book?.category}</p>
    <p>Доступ: {book?.isFree ? 'Бесплатно' : 'Платно'}</p>
    <h2>Аннотация</h2>
    <p className="annotation">{book?.annotation}</p>

    <h2>Похожие книги</h2>
    <ul className="related-books">
      {relatedBooks.map((relatedBook) => (
        <li key={relatedBook.id} className="related-book-item">
          <Link to={`/book/${relatedBook.id}`}>{relatedBook.title}</Link>
        </li>
      ))}
    </ul>

    <h2>Чтение книги</h2>
    <ReadingWidget
      content={book?.content || ''}
      isFree={book?.isFree || false}
      onPurchaseRequest={handlePurchase}
    />
  </div>
);
};

export default BookPage;