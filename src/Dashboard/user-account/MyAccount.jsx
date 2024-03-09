import userImg from '../../assets/images/organiser-img01.png'
import {useContext,useState} from 'react';
import { authContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import MyBookings from './MyBookings';
import Profile from './Profile';
import useGetProfile from '../../hooks/userFetchData'
import {BASE_URL} from '../../config'


const MyAccount = () => {

 const {dispatch} = useContext(authContext)
 const [tab, setTab] = useState('bookings');

 const {
  data:userData,
  loading,
  error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`)

  console.log(userData,'userdata');


 const handlelogout =()=>{
  dispatch({type:"LOGOUT"})
 }

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
      <div className='grid md:grid-cols-3 gap-10'>
        <div className='pb-[50px] px-[30px] rounded-md'>
          <div className='flex items-center justify-center'>
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
              <img 
              src={userImg} 
              alt='user-profile-avatar' 
              className='w-full h-full rounded-full'/>
            </figure>
          </div>
          <div className='text-center mt-4'>
            <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>
              FVENTS
            </h3>
            <p className='text-textColor text-[15px] leading-6 font-medium'>
              fvents@gmail.com
            </p>

          </div>
          <div className='mt-[50px] md:mt-[100px]'>
          <Link to='/login'>
            <button onClick={handlelogout} className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
              Logout</button>
              </Link>
            <button className='w-full bg-red-600 p-3 mt-4 text-[16px] leading-7 rounded-md text-white'>Delete Account</button>
          </div>
        </div>

        <div className='md:col-span-2 md:px-[30px]'>
          <div>
          <button 
           onClick={() => setTab('bookings')} 
          className={`${
          tab === 'bookings' ? 'bg-primaryColor text-white font-normal' : 'text-headingColor'
          } p-2 px-5 rounded-md text-[16px] leading-7 border border-solid border-primaryColor mr-5`}
          >
            My Booking
          </button>

          <button 
          onClick={() => setTab('settings')} 
          className={`${
          tab === 'settings' ? 'bg-primaryColor text-white font-normal' : 'text-headingColor'
          } p-2 px-5 rounded-md text-[16px] leading-7 border border-solid border-primaryColor`}
          >
            Profile Settings
        </button>

          </div>

          {
            tab==='bookings' && <MyBookings/>
          }

          {
            tab==='settings' && <Profile/>
          }
        </div>
      </div>

    </div>
    </section>
  )
}

export default MyAccount