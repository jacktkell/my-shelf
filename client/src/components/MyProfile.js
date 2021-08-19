import React, {useEffect, useState} from 'react'

function MyProfile({currentUser}) {
    const [profile, setProfile] = useState([])

    useEffect(() => {
        async function getProfile() {
            const res = await fetch(`/users/${currentUser.id}`)
            if(res.ok) {
                const user = await res.json();
                setProfile(user)
            }
        }
        getProfile()
    }, [])

    const {name, fav_genre, bio, book_titles} = profile


    return (
        <div>
            <h1>{name}'s Profile</h1>
            <h2> favorite book rendered here</h2>
            <h2> Favorite genre: {fav_genre}</h2>
            <h2>Book on your shelf: {book_titles.length}</h2>
            <h2>About {name}: </h2>
            <p>{bio}</p>
        </div>
    )
}

export default MyProfile
