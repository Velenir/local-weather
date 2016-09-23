import React from 'react';

import promiseGeolocation from './requests/geolocation';

// document.body.appendChild(component());
promiseGeolocation().then(pos => console.log(pos.coords))
.catch(err => console.log(err));
