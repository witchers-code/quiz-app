import s from './TestHeader.module.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetchTestQuery } from '../../../features/test/testApi';
//After video add DevButton: 
import BtnRectangle from '../../Profile/BtnRectangle/BtnRectangle';
import { useAppSelector } from '../../../app/hooks';


const TestHeader = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: testData }  = useFetchTestQuery(params.id!);
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  const userState = useAppSelector((state: any) => state.user);
  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    if(userState.language) {
      setLanguage(userState.language);
    } else if(languageSet) {
      setLanguage(languageSet);
    }
  },[userState.language]);

  return (
    <>
      {
        (testData) && (
          <>
            <div className={s.divHeader}>
              <Link to={`/${testData.blogger.id}`}>
                <img className={s.avatarHeader} src={testData.blogger.avatar} alt={'Avatar'}/>
              </Link> 
              <div className={s.divText}>
                <div className={s.bloggerNamePlusLng}>
                  {/* <span className={s.bloggerName}>{t('bloggerName')}</span> */}
                  <Link to={`/${testData.blogger.id}`}>
                    <span className={s.bloggerName}>
                      {(language && language === 'or') ? testData.blogger.name.or : testData.blogger.name.ua}
                    </span>
                  </Link>
                </div>
                {/* <span className={s.testName}>{t('testName')}</span> */}
                <span className={s.testName}>
                  {(language && language === 'or') ? testData.testName.or : testData.testName.ua}
                </span> 
              </div>
            </div>
            
            {/* AFTER Max video release */}
            <div 
              style={{
                marginTop: '0.5rem',
              }}
            >
              <BtnRectangle 
                caption={(language && language === 'or') ? `> Разработчик` :`> Розробник`} 
                onClick={() => navigate('/developer')} />
            </div>
          </>
        )
      }
    </>
  );
};

export default TestHeader;