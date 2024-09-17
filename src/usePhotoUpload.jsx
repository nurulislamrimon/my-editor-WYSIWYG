import { useState } from "react";

export const usePhotoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadPhotosAndUpdateContent = async ({ images, content }) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const imgTags = doc.querySelectorAll("img");

      imgTags.forEach((img, index) => {
        if (images[index]) {
          const imageObjectURL = URL.createObjectURL(images[index]);
          img.src = imageObjectURL;
        }
      });

      return doc.body.innerHTML;
    } catch (error) {
      setUploadError(error.message);
      return content;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadPhotosAndUpdateContent, isUploading, uploadError };
};
