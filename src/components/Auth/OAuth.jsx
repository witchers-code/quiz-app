import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import s from './OAuth.module.scss';
import GLogo from '../../assets/svg/GoogleLogo.svg';

const OAuth = () => {
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // If user, doesn't exist, create user 
      if(!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        });
      }
      navigate('/profile');
    } catch (error) {
      console.error('Could not authorize with Google');
    }
  };

  return (
    <button className={s.btnG} onClick={onGoogleClick}>
      <div className={s.circleFrame}>
        <img src={GLogo} alt='Google SignUp'/>
      </div>
      <p className={s.regGmail}
        style={{marginTop: '-2rem'}}
      >
                Ввійти через Gmail
      </p>
    </button>
  );
};

export default OAuth;