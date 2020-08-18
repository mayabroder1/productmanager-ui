import { AUTH_TOKEN, AUTH_TOKEN_IV } from './pages/login/Login';

export const deleteCookie = ( name ) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function getCookie(cookiename)
{
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

export function getAuthTokenHeaders() {
  return {
    'Pm-Auth-Token': getCookie(AUTH_TOKEN),
    'Pm-Auth-Token-Iv': getCookie(AUTH_TOKEN_IV),
  };
}
