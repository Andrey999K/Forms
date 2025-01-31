import axios from 'axios';

const cloudinaryBaseURL = import.meta.env.VITE_CLOUDINARY_BASE_URL;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const cloudinaryApi = axios.create({
  baseURL: cloudinaryBaseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', upload_preset);

  try {
    const { data } = await cloudinaryApi.post('/image/upload', formData);
    return data.secure_url;
  } catch (error) {
    console.error('ошибка загрузки в cloudinary:', error);
  }
};
