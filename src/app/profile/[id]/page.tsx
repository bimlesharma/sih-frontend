import { use } from 'react';
import Link from 'next/link';

export default async function UserProfile({params}: any) {

  const {id} = await params;
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>User Profile: {id}</h1>
      <h1>Note: Kindly check your indox to verify your account.</h1>
    </div>
  );
};

