import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import * as songService from '../../services/songService'
import { AuthedUserContext } from '../../App'


const SongDetails = ({ handleDeleteSong }) => {
    const user = useContext(AuthedUserContext)
    console.log(user)
    const [song, setSong] = useState(null)

    const { songId } = useParams()

    useEffect(() => {

        const fetchSong = async () => {
            const singleSong = await songService.show(songId)
            setSong(singleSong)
        }
        fetchSong()
    }, [songId])

    if (!song) return <main>Loading...</main>


    return (
        <main className='song-container'>
            <header>
                <h1>{song.title}</h1>
                <h4>by {song.artist} <br />
                    released {song.release_year}
                </h4>
                <iframe
                    src={`https://open.spotify.com/embed/track/${extractSpotifyId(song.audio_url)}`}
                    width="300"
                    height="180"
                    frameBorder="0"
                    allow="encrypted-media">
                </iframe>
                {song.owner === user.user_id &&
                    <section>
                        <button onClick={() => handleDeleteSong(songId)}>Delete song</button>
                        <Link to={`/songs/${songId}/edit/`}>update songs</Link>
                    </section>
                }

            </header>
        </main>
    )
    function extractSpotifyId(url) {
        // This function extracts the track ID from a Spotify URL
        const match = url.match(/track\/([^?]*)/);
        return match ? match[1] : '';
    }

}
export default SongDetails