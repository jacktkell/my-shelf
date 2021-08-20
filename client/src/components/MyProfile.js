import React, {useEffect, useState} from 'react'

function MyProfile({currentUser}) {
    const [profile, setProfile] = useState([])
    const [bookCount, setBookCount] = useState([])

    useEffect(() => {
        async function getProfile() {
            const res = await fetch(`/users/${currentUser.id}`)
            if(res.ok) {
                const user = await res.json();
                setProfile(user)
                setBookCount(user.book_titles.length)
            }
        }
        getProfile()
    }, [])

    const {name, fav_genre, bio} = profile

    return (
        <div>
            <h1>{name}'s Profile</h1>
            <h2> favorite book rendered here</h2>
            <h2> Favorite genre: {fav_genre}</h2>
            <h2>Books on your shelf: {bookCount}</h2>
            <h2>About {name}: </h2>
            <p>{bio}</p>

            <div>
                <h4>Something change? <a href = "/update">Update your profile here</a></h4>
            </div>
        </div>
    )
}

export default MyProfile