import { useState, useEffect } from 'react'
import { getAuth, updateProfile} from 'firebase/auth'
import {updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-toastify'



function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
       name: auth.currentUser.displayName,
       email:auth.currentUser.email,
  })

  const { name, email } = formData
  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    
    try {
      if(auth.currentUser.displayName !== name){
        //Update display name in firebase
        await updateProfile(auth.currentUser,{
          displayName: name
        })
      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, {
        name
      })
      }
    } catch (error) {
      toast.error('Could not update profile details')
      
    }
  }

  const onChange = (e) => {
    setFormData((prevState) =>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

     return <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>Log Out</button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p className='changePersonalDetails' 
            onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input 
            type='text'
            id='name' 
            className={!changeDetails ? 'profileName' : 
            'profileNameActive'}
            disabled={!changeDetails}
            value={name}
            onChange={onChange}
             />
             <input 
            type='text'
            id='email' 
            className={!changeDetails ? 'profileEmail' : 
            'profileEmailActive'}
            disabled={!changeDetails}
            value={email}
            onChange={onChange}
             />
          </form>
        </div>
      </main>
     </div>  
}
  export default Profile