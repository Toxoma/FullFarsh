'use strict';

function setCookie(key, value, year, month, day, path, domain, secure) {
   let cookieStr = key + '=' + value;
   if (year) {
      const expires = new Date(year, month, day);
      cookieStr += '; expires=' + expires.toGMTString();
      console.log('cookieStr: ', cookieStr);
   }

   cookieStr += path ? '; path=' + path : '';
   cookieStr += domain ? '; domain=' + domain : '';
   cookieStr += secure ? '; secure' : '';

   document.cookie = cookieStr;
}

