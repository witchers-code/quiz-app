
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
  doc, collection, getDoc, 
  addDoc, query, where, 
  getDocs, setDoc 
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { TestType, VerdictListType } from '../../types/test.types';


export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Test', 'TestCard', 'Verdict'],
  endpoints: (builder) => ({
    fetchTest: builder.query<any, string>({
      async queryFn(testId) {
        try {
          const docRef = doc(db, "tests", testId);
          const testDoc = await getDoc(docRef);
          const testData = testDoc.data();

          return { data: testData};
        } catch(err) {
          return { error: err };
        }
      },
      providesTags: ['Test'],                 
    }),
    fetchTestsByBlogger: builder.query<any, string>({
      async queryFn(bloggerName) {
        let arrayTests: any[] = [];
        try {
          const q = query(
            collection(db, "testsCards"), 
            where("blogger.name.ua", "==", bloggerName),
            // orderBy("desc"),
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => arrayTests.push(doc.data()));

          // setListings((prevState) => [...prevState, ...listingsList])
          return { data: arrayTests};
        } catch(err) {
          return { error: err };
        }
      },
      providesTags: ['TestCard'],                 
    }),
    addTest: builder.mutation<any, TestType>({
      async queryFn(data) {
        try {
          await setDoc(doc(db, 'tests', data.id), {
            ...data,
          });
          return { data: 'Added Test Success' };
        } catch(err) {  
          return { error: err };
        }
                   
      },
      invalidatesTags: ['Test'],
    }),
    addVerdict: builder.mutation<any, VerdictListType>({
      async queryFn(data) {
        try {
          await addDoc(collection(db, 'verdict'), {
            ...data,
          });
          return { data: 'Added Verdict Success' };
        } catch(err) {  
          return { error: err };
        }
                   
      },
      invalidatesTags: ['Verdict'],
    }),
  }),
});

export const { useFetchTestQuery, useAddTestMutation, useFetchTestsByBloggerQuery } = testApi; 
