import React, { useRef } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImageCropper = ({ imageSrc, onCropComplete, aspectRatio = 16 / 9 }) => {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedDataUrl = cropper.getCroppedCanvas().toDataURL('image/jpeg');
      onCropComplete(croppedDataUrl);
    }
  };

  return (
    <div>
      {imageSrc && (
        <div>
          <Cropper
            src={imageSrc}
            style={{ height: 400, width: '100%' }}
            aspectRatio={aspectRatio}
            guides={false}
            ref={cropperRef}
          />
          <button
            type="button"
            onClick={handleCrop}
            className="btn px-4 py-2 rounded bg-[var(--color-green)] mt-4"
          >
            Crop Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
