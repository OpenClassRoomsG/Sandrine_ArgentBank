import React from 'react';
import User from '/src/components/profileUser/User.jsx';
import Account from '../components/account/Account.jsx';

export default function ProfileUser() {
  return (
    <div>
      <div className='main bg-dark'>
      <User />
      <Account
          title="Argent Bank Checking (x8349)"
          amount="$20,082.79"
          description="Available Balance"
        />
         <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
    </div>
    </div>
  );
}
