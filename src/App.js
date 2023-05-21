import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import DomainIcon from '@mui/icons-material/Domain';
import MailIcon from '@mui/icons-material/Mail';
import TwitterIcon from '@mui/icons-material/Twitter';
import photo from './images/photo.svg';
import photo2 from './images/noDataFound.svg';
import './App.css';

function App() {

  {/*ADDING STYLES*/ }
  const iconStyle = {
    color: 'white',
    display: 'flex',
    marginTop: '13px',
    paddingLeft: '10px'
  }

  const iconsDiv = {
    fontSize: '13px',
    color: '#84899a',
    display: 'flex',
    alignItems: 'center'
  }

  const allIcons = {
    fontSize: '14px',
    marginRight: '5px'
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px'
  }

  const avatarStyle = {
    width: "100px",
    borderRadius: '100px',
    marginRight: '18px '
  }

  const noData = {
    width: "35vh",
    marginRight: '18px '
  }

  const searchStart = {
    width: "40vh",
    marginRight: '18px '
  }

  const noBio = {
    fontSize: '14px',
    color: '#84899a'
  }

  const bio = {
    fontSize: '14px',
    color: '#84899a',
    textAlign: 'left'
  }


  const [input, setInput] = useState("");  // ADD STATE FOR INPUT
  const [user, setUser] = useState({}); // ADD STATE FOR FINDING USER
  const [errorMessage, setErrorMessage] = useState(""); // ADD STATE FOR ERROR MESSAGE


  {/*API INTEGRATION*/ }

  const handleSearch = async () => {

    try {
      const response = await axios.get(`https://api.github.com/users/${input}`)
      setUser(response.data)
      setErrorMessage(""); // CLEAR ANY PREVIOUS ERROR MESSAGE
    } catch (error) {
      console.log(error.message);
      setErrorMessage("No such user found. Please try again."); // SET ERROR MESSAGE
    }

  };


  // METHOD TO DIRECT USER TO GITHUB PAGE

  const handlecontact = () => {
    window.location.href = user.html_url;
  }


  return (
    <Container maxWidth='sm'>

      <div className='container'>
        <h1>GitHub Profile Finder</h1>
        <div className='search-area'>

          {/*Search bar Field*/}
          <SearchIcon style={iconStyle} />
          <input
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter Username..'
            type='text'
            name='username'
            id=''
            className='search-bar'
          />

          {/*Search Button*/}

          <button
            onClick={handleSearch}
            className='search-btn'
            type='submit'>
            Search
          </button>

        </div>


        {/* CONDITIONALLY RENDER ERROR MESSAGE */}
        {errorMessage ? (
          <div>
            <img src={photo2} height={200} width={100} alt="description" style={noData} />
            <p style={{ color: 'white' }}>{errorMessage}</p>
          </div>
        ) : (

          Object.keys(user).length > 0 ?
            (
              <div className='card'>

                <div className='image-name'>
                  <img src={user.avatar_url}  alt='no data found' style={avatarStyle} />
                  <h1 style={{ fontSize: '27px' }}>{user.login}</h1>
                </div>

                {user.name === null ? "" : <p className='title' style={{ color: '#0d5ab7' }}>Name: {user.name}</p>}
                {user.bio === null ? <p style={noBio}>This profile has no bio</p> : <p style={bio}>Bio: {user.bio}</p>}

                <Container style={containerStyle}>
                  <table className='table'>
                    <thead >
                      <tr>
                        <th>Repositories</th>
                        <th>Followers</th>
                        <th>Following</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>{user.public_repos}</strong></td>
                        <td><strong>{user.followers}</strong></td>
                        <td><strong>{user.following}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </Container>

                <div className='icon-style'>
                  <div style={iconsDiv}>
                    <DomainIcon style={allIcons} />
                    {user.company === null ? "Not Avaliable" : <span > {user.company} </span>}
                  </div>

                  <div style={iconsDiv}>
                    <TwitterIcon style={allIcons} />
                    {user.twitter_username === null ? " Not Avaliable" : <span> {user.twitter_username}</span>}
                  </div>

                  <div style={iconsDiv}>
                    <MailIcon style={allIcons} />
                    {user.email === null ? " Not Avaliable" : <span> {user.email}</span>}
                  </div>

                </div>

                <p><button onClick={handlecontact} className='btn'>Contact</button></p>
              </div>) : (
              <div >
                <img src={photo} alt="description of the image" style={searchStart} />
                <p style={{ color: 'white' }}>Search for a GitHub user to get started!</p>
              </div>
            ))
        }
      </div>
    </Container>
  )
}

export default App