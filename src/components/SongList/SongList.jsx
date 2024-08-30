import { Link } from 'react-router-dom' 
import './SongList.css'


const SongList = ({ songs }) => {

    return (
        <main className='song-list-container'>
            {songs.map(song => {
                return (
                    <Link key={song.id} to={`/songs/${song.id}`}>
                        <article>
                            <div className='song-wrap'>
                                <div className='song-list'>
                            <header>
                                <h3>{song.title}</h3>
                                <div>
                                    {/* <img 
                                        src={song.cover_image} 
                                        alt={`${song.title} cover`} 
                                    /><br/> */}
                                    <iframe 
                                        src={`https://open.spotify.com/embed/track/${extractSpotifyId(song.audio_url)}`}
                                        width="300" 
                                        height="100" 
                                        frameBorder="0" 
                                        allow="encrypted-media">
                                    </iframe>
                                </div>
                            </header>
                            </div>
                            </div>
                        </article>
                    </Link>
                );
            })}
        </main>
    );
    
    function extractSpotifyId(url) {
        // This function extracts the track ID from a Spotify URL
        const match = url.match(/track\/([^?]*)/);
        return match ? match[1] : '';
    }
}

export default SongList