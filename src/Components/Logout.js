import { useEffect } from 'react'
import { ReactSession }  from 'react-client-session';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Logout() {

  useEffect(() => {

    // Remove all user cookies and sessions
    ReactSession.remove('user');
    cookies.remove('user');

    window.location.href = '/';
  })

  return null;
}
