import axios from 'axios';

const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const cloudinaryAPI = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${cloud_name}`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', upload_preset);

  try {
    const { data } = await cloudinaryAPI.post('/image/upload', formData);
    return data.secure_url;
  } catch (error) {
    console.error('Ошибка загрузки в cloudinary:', error);
  }
};
