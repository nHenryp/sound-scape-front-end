import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageUpload from '../ImageUpload/ImageUpload'
import * as songService from '../../services/songService'

const SongForm = ({ handleAddSong, handleUpdateSong }) => {
    const [formData, setFormData] = useState({
        title: '',
        audio_url: '',
        artist: '',
        release_year: '',
       // cover_image: '', 
        genres: [],
    });

    const { songId } = useParams() 

    useEffect(() => {

        const fetchSong = async () => {
            const singleSong = await songService.show(songId)
           setFormData(singleSong)
        } 
        if (songId) {
           fetchSong()
        }
    }, [songId])


    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleImageUpload = (imageUrl) => {
        setFormData((prevData) => ({ ...prevData, cover_image: imageUrl }));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (songId) {
             handleUpdateSong(songId, formData)
            console.log('songid',songId, 'formdata:',formData)
        } else {
            handleAddSong(formData)
        }
    };

    return (
        <main>
            <div className='wrapper'>
                <div className='song-form'>
            <h1>{songId ? 'Update Song' : 'Create Song'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title-input'>Title</label>
                <input
                    required
                    type='text'
                    name='title'
                    id='title-input'
                    value={formData.title}
                    onChange={handleChange}
                />
                <label htmlFor='artist-input'>Artist</label>
                <input
                    required
                    type='text'
                    name='artist'
                    id='artist-input'
                    value={formData.artist}
                    onChange={handleChange}
                />
                <label htmlFor='audio-url-input'>Audio URL</label>
                <input
                    required
                    type='url'
                    name='audio_url'
                    id='audio-url-input'
                    value={formData.audio_url}
                    onChange={handleChange}
                />
                <label htmlFor='release-year-input'>Release Year</label>
                <input
                    required
                    type='number'
                    name='release_year'
                    id='release-year-input'
                    value={formData.release_year}
                    onChange={handleChange}
                />
                {/* <label htmlFor='cover-image-input'>Cover Image</label>
                <ImageUpload
                name='cover_image'
                label='upload image'
                cover_image={formData.cover_image}
                 onImageUpload={handleImageUpload} 
                 /> */}
                {/* <label htmlFor='genres-input'>Genres</label>
                <input
                    type='text'
                    name='genres'
                    id='genres-input'
                    value={formData.genres}
                    onChange={handleChange}
                /> */}
                <button type='submit'>Submit</button>
            </form>
            </div>
            </div>
        </main>
    );
};

export default SongForm