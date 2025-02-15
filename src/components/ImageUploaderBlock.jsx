import { useState, useRef } from "react";

const ImageUploaderBlock = ({ images, setImages }) => {
  const [isUploadDragging, setIsUploadDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);

  // File upload handlers
  const handleFileChange = (e) => {
    const validFiles = validateFiles(e.target.files);
    addFiles(validFiles);
  };

  const handleUploadDragOver = (e) => {
    e.preventDefault();
    setIsUploadDragging(true);
  };

  const handleUploadDragLeave = (e) => {
    e.preventDefault();
    setIsUploadDragging(false);
  };

  const validateFiles = (files) => {
    return Array.from(files).filter((file) => file.type.startsWith("image/"));
  };

  const handleUploadDrop = (e) => {
    e.preventDefault();
    setIsUploadDragging(false);

    const validFiles = validateFiles(e.dataTransfer.files);
    addFiles(validFiles);
  };

  const addFiles = (files) => {
    if (!Array.isArray(files) || !setImages) return;

    const newImages = files.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages = []) => [...prevImages, ...newImages]);
  };

  // Image sorting handlers
  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    if (!setImages) return;
    setImages((prevImages = []) => prevImages.filter((_, i) => i !== index));
  };

  const handleDragStart = (event, index) => {
    if (!images[index]) return;

    setDraggedIndex(index);

    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    event.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragEnter = (event, index) => {
    event.preventDefault();

    if (draggedIndex !== null && draggedIndex !== index) {
      setImages((prevImages = []) => {
        const newImages = [...prevImages];
        const [movedImage] = newImages.splice(draggedIndex, 1);
        newImages.splice(index, 0, movedImage);
        return newImages;
      });
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <>
      <div className="block text-left mb-2 mt-8">Upload images</div>
      <div
        className={`w-full border-dashed border-2 rounded-lg h-32 flex items-center cursor-pointer transition ${
          isUploadDragging
            ? "bg-gray-200 border-blue-400"
            : "bg-gray-100 border-gray-300"
        }`}
        onDragOver={handleUploadDragOver}
        onDragLeave={handleUploadDragLeave}
        onDrop={handleUploadDrop}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <p className="text-gray-500 text-center m-auto">
          Drag & drop images here or click to upload
        </p>
        <input
          ref={fileInputRef}
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {Array.isArray(images) &&
          images.map((image, index) => (
            <div
              key={index}
              className={`relative group cursor-move ${
                draggedIndex === index ? "opacity-50" : ""
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
            >
              <img
                src={image.preview}
                alt={`Product ${index + 1}`}
                className="w-full h-32 object-cover rounded-md border select-none"
              />
              <button
                onClick={(e) => handleRemoveImage(e, index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition"
              >
                x
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default ImageUploaderBlock;
