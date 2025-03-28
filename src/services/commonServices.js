import Gateway from '../config/gateway';

const uploadFiles = (formData) =>
  Gateway.post('upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
const deleteFiles = (key) =>
  Gateway.delete(`upload/${key}`);

export { uploadFiles, deleteFiles };
