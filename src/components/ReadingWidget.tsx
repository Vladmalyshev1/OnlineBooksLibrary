import React, { useState } from 'react';

interface ReadingWidgetProps {
  content: string;
  isFree: boolean;
  onPurchaseRequest: (contactInfo: string) => void;
}

const ReadingWidget: React.FC<ReadingWidgetProps> = ({ content, isFree, onPurchaseRequest }) => {
  const pages = content.split('|||');
  const [currentPage, setCurrentPage] = useState(1);
  const [contactInfo, setContactInfo] = useState('');
  const maxFreePages = 20;

  const handleNextPage = () => {
    if (!isFree && currentPage >= maxFreePages) {
      alert('Пожалуйста, купите книгу, чтобы продолжить чтение.');
      return;
    }
    if (currentPage < pages.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePurchase = () => {
    onPurchaseRequest(contactInfo);
  };

  return (
    <div className="reading-widget">
    <h3>Страница {currentPage}</h3>
    <div className="page-content">
      {pages[currentPage - 1]}
      
      {!isFree && currentPage >= maxFreePages && (
        <div className="purchase-form">
          <h4>Для продолжения чтения требуется покупка</h4>
          <div className="purchase-form-content">
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Введите ваш email или телефон"
              className="contact-input"
            />
            <button 
              onClick={handlePurchase} 
              className="purchase-button"
              disabled={!contactInfo.trim()}
            >
              Отправить запрос на покупку
            </button>
          </div>
        </div>
      )}
    </div>

    <div className="page-controls">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Предыдущая страница
      </button>
      <button onClick={handleNextPage} disabled={currentPage === pages.length || (!isFree && currentPage >= maxFreePages)}>
        Следующая страница
      </button>
    </div>
  </div>
);
};

export default ReadingWidget;