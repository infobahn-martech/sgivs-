import axios from "axios";

const downloadContent = async (
  url, 
  filename,
  onProgress
) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        
        if (onProgress) {
          onProgress(percentCompleted);
        }
      }
    });

    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

export { downloadContent };
