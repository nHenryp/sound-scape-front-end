import { useState } from 'react';

const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const ImageUpload = ({ name, photoImage, onImageUpload }) => {
    const [message, setMessage] = useState('');

    const handleSelectImage = async (event) => {
        const file = event.target.files[0];

        if (file.size > 1000000) {
            return setMessage('Image too large. Please select a smaller image (max: 1MB).');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            const res = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) {
                throw new Error('Image upload failed')
            }

            const imageData = await res.json()
            onImageUpload(imageData.secure_url)
            setMessage('');
        } catch (error) {
            setMessage('Error uploading image. Please try again.');
            console.error('Error uploading image:', error);
        }
    };

    return (
        <>
        { photoImage ?
        <div className='photo-image' style={{ backgroundImage: `url(${photoImage})`}}></div>
          : 
<>
        <label htmlFor={name}></label>
        <input 
        type='file'
        name={name} 
        id={name} 
        accept='image/*'
        onChange={handleSelectImage}
        />
        {message && <p className="error-message">{message}</p>}
        </>
}
</>
    );
};

export default ImageUpload