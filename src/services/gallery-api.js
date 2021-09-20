import axios from 'axios';
const API_KEY = '22688730-7478780a51f867bdd79495f14';

async function fetchImages(imageName, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  if (response.status === 200) {
    return response.data.hits;
  }
}

const api = {
  fetchImages,
};

export default api;