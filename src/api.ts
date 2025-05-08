import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchBooks = async (query?: string) => {
  const response = await axios.get(`${API_URL}/books`, { params: { q: query } });
  return response.data;
};

export const fetchBookById = async (id: number) => {
  const response = await axios.get(`${API_URL}/books/${id}`);
  return response.data;
};

export const fetchBooksByIds = async (ids: number[]) => {
  try {
    const response = await axios.get(`${API_URL}/books`, {
      params: { id: ids.join(',') },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке связанных книг:', error);
    throw error;
  }
};

export const savePurchaseRequest = async (data: { bookId: number; contactInfo: string }) => {
  const response = await axios.post(`${API_URL}/purchaseRequests`, data);
  return response.data;
};

export const fetchPurchaseRequests = async () => {
  const response = await axios.get(`${API_URL}/purchaseRequests`);
  return response.data;
};