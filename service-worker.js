"use strict";var precacheConfig=[["/udacityFEND-neighborhoodMap/index.html","48528fa342bebe277a7d32cd7362aab9"],["/udacityFEND-neighborhoodMap/static/css/main.698bcb02.css","89e058dd93bbd8c8c3550dbd8b748358"],["/udacityFEND-neighborhoodMap/static/js/main.ac289686.js","f56184fb95f22ff472456043361a279d"],["/udacityFEND-neighborhoodMap/static/media/egypt.fc9ae208.jpg","fc9ae208e1c085513e22a57d34d1bf7e"],["/udacityFEND-neighborhoodMap/static/media/elephants.7c6e93de.jpg","7c6e93dedc03e478bd0ba2494b3bb1ee"],["/udacityFEND-neighborhoodMap/static/media/fitzroy.d5aec7d5.jpg","d5aec7d5d314d1299e1a2d0bedf57aaf"],["/udacityFEND-neighborhoodMap/static/media/globe.0fd34d4c.png","0fd34d4c21866c8542e85ade486e5590"],["/udacityFEND-neighborhoodMap/static/media/greece.579702a2.jpg","579702a2ab366d86fe69fae61cc8107b"],["/udacityFEND-neighborhoodMap/static/media/iguazu.4cf3bbd7.jpg","4cf3bbd75d2b3904716f5caf4e35f4f9"],["/udacityFEND-neighborhoodMap/static/media/iran.19adf494.jpg","19adf494e42f74a4b7116f726a3b7c82"],["/udacityFEND-neighborhoodMap/static/media/operahouse.94c4c4d7.jpg","94c4c4d70b52ca95cf9edd3896dc88e8"],["/udacityFEND-neighborhoodMap/static/media/peru.2a4c7bde.jpg","2a4c7bde611d4e42aad708c017281980"],["/udacityFEND-neighborhoodMap/static/media/petra.18d430e6.jpg","18d430e62e398a392e0cd84fa2091d03"],["/udacityFEND-neighborhoodMap/static/media/prague.5d7b8abc.jpg","5d7b8abc6d276f2efde5703b9c29f127"],["/udacityFEND-neighborhoodMap/static/media/prayerflags.b8dc5405.jpg","b8dc54056de758cb002507a4449fdee3"],["/udacityFEND-neighborhoodMap/static/media/russia.3911435c.jpg","3911435c20838e5a69f6f7d5a784762e"],["/udacityFEND-neighborhoodMap/static/media/siemreap2.60dcccbb.jpg","60dcccbb782eb65f8d12a5e72083c0e3"],["/udacityFEND-neighborhoodMap/static/media/tajmahal.92af95f7.jpg","92af95f75ff3a94295d409979b1f0ae7"],["/udacityFEND-neighborhoodMap/static/media/torres.a26cd956.jpg","a26cd956e2e948ee43de9eeb76e854ae"],["/udacityFEND-neighborhoodMap/static/media/trinidad.124e9ca1.jpg","124e9ca1e7d47cfa2ffff3ea3de03d9b"],["/udacityFEND-neighborhoodMap/static/media/venice.d7e9bb5c.jpg","d7e9bb5cef96ac608f32bb94fddf4247"],["/udacityFEND-neighborhoodMap/static/media/vigan.f9106a78.jpg","f9106a78a47a7dd9ac4990dfb74aa81d"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),c=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),e=urlsToCacheKeys.has(t));var c="/udacityFEND-neighborhoodMap/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});