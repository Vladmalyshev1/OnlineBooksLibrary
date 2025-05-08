import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks, savePurchaseRequest } from '../api';

interface Book {
  id: number;
  title: string;
  author: string;
  isFree: boolean;
}

interface PurchaseRequest {
  id: number;
  bookId: number;
  bookTitle: string;
  contactInfo: string;
  date: string;
}

const AdminPanel: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      navigate('/login');
    }

    const loadData = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);

        const storedRequests = localStorage.getItem('purchaseRequests');
        if (storedRequests) {
          setPurchaseRequests(JSON.parse(storedRequests));
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const handleRequestProcessed = (id: number) => {
    const updatedRequests = purchaseRequests.filter(request => request.id !== id);
    setPurchaseRequests(updatedRequests);
    localStorage.setItem('purchaseRequests', JSON.stringify(updatedRequests));
  };

  const handleToTheSite = () => {
    navigate('/');
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Панель администратора</h1>
        <div className="button-container">
          <button onClick={handleToTheSite} className="to-the-site-button">
            На сайт
          </button>
          <button onClick={handleLogout} className="logout-button">
            Выйти
          </button>
        </div>
      </header>

      <div className="admin-content">
        <section className="stats-section">
          <h2>Статистика</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Всего книг</h3>
              <p>{books.length}</p>
            </div>
            <div className="stat-card">
              <h3>Бесплатные книги</h3>
              <p>{books.filter(book => book.isFree).length}</p>
            </div>
            <div className="stat-card">
              <h3>Платные книги</h3>
              <p>{books.filter(book => !book.isFree).length}</p>
            </div>
            <div className="stat-card">
              <h3>Запросы на покупку</h3>
              <p>{purchaseRequests.length}</p>
            </div>
          </div>
        </section>

        <section className="requests-section">
          <h2>Запросы на покупку</h2>
          {purchaseRequests.length > 0 ? (
            <table className="requests-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Книга</th>
                  <th>Контактная информация</th>
                  <th>Дата</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {purchaseRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.bookTitle}</td>
                    <td>{request.contactInfo}</td>
                    <td>{request.date}</td>
                    <td>
                      <button
                        onClick={() => handleRequestProcessed(request.id)}
                        className="process-button"
                      >
                        Обработано
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Нет активных запросов на покупку</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
