import { createContext, useState, useEffect,  } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard'
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'
import * as authService from '../src/services/authService'
import SongList from './components/SongList/SongList'
import * as songService from '../src/services/songService'
import SongDetails from './components/SongDetails/SongDetails'
import SongForm from './components/SongForm/SongForm'


export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  //console.log('User in App:', user)
  const [songs, setSongs] = useState([])
 

  const navigate = useNavigate()
 
  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }


  useEffect(() => {
    const fetchAllSongs = async () => {
      const allSongs = await songService.index()
      setSongs(allSongs)
    }
    if (user){
      fetchAllSongs()
    }
  }, [user])

  const handleAddSong = async (formData) => {
     const newSong = await songService.create(formData)
     setSongs([newSong, ...songs])
     navigate('/songs/')
  }

  const handleUpdateSong = async (songId, formData) => {
    const updatedSong = await songService.update(songId, formData)
    console.log(updatedSong)
    navigate(`/songs/`)
  }
 
  const handleDeleteSong = async (songId) => {
    const deletedSong = await songService.deleteSong(songId)
    console.log(deletedSong)
    navigate('/songs/')
  }
    

  return (
    <>
    <AuthedUserContext.Provider value={user}>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        {
          user ?
          <>
          <Route path='/' element={<Dashboard  value={user}/>} />
          <Route path='/songs/' element={<SongList songs={songs} />} />
          <Route path='/songs/:songId/' element={<SongDetails handleDeleteSong={handleDeleteSong}/>}/>
          <Route path='/songs/new/' element={<SongForm handleAddSong={handleAddSong} />}/>
          <Route path='/songs/:songId/edit' element={<SongForm handleUpdateSong={handleUpdateSong} />} />
          </>
          :
          <Route path='/' element={<Landing />} />
        }

        <Route path='/signup' element={<SignupForm setUser={setUser} />} />
        <Route path='/signin' element={<SigninForm setUser={setUser} />} />
      </Routes>
      </AuthedUserContext.Provider>
    </>
  )
};

export default App;