const BASE_URL = `${import.meta.env.VITE_DJANGO_BACKEND_URL}/songs/`
import { getAccess } from "./authService"


export const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${getAccess()}` }
    })
    return res.json()
    } catch (error) {
      console.log(error) 
      throw error
    }
}

export const show = async (songId) => {
    try {
      const res = await fetch(`${BASE_URL}${songId}/`, {
        headers: { Authorization: `Bearer ${getAccess()}`
    }
      })
      return res.json()
    } catch (error) {
        console.log(error)
    }
}

export const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${getAccess()}`,
               'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
       })
       return res.json()
    } catch (error) {
        console.log(error)
    }
}

export const deleteSong = async (songId) => {
    try {
        const res = await fetch(`${BASE_URL}${songId}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getAccess()}`
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export const update = async (songId, formData) => {
    try {
        const res = await fetch(`${BASE_URL}${songId}/`,{
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${getAccess()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}