if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,c,i)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const n={uri:location.origin+s.slice(1)};return Promise.all(c.map(s=>{switch(s){case"exports":return a;case"module":return n;default:return e(s)}})).then(e=>{const s=i(...e);return a.default||(a.default=s),a})}))}}define("./sw.js",["./workbox-dbe20666"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"Z5E6vYjSI5JHNvzj5szUd"},{url:"/_next/static/Z5E6vYjSI5JHNvzj5szUd/_buildManifest.js",revision:"fb96ae7926f5104f50f0cf1b3a23a9b5"},{url:"/_next/static/Z5E6vYjSI5JHNvzj5szUd/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/Z5E6vYjSI5JHNvzj5szUd/pages/%5Blng%5D.js",revision:"0d64211a53e1f9a195efc124c318439f"},{url:"/_next/static/Z5E6vYjSI5JHNvzj5szUd/pages/%5Blng%5D/add-url.js",revision:"1cccc05006ef01ec3ccbb9c898ca7b7a"},{url:"/_next/static/Z5E6vYjSI5JHNvzj5szUd/pages/_app.js",revision:"8299eedea9d00dd5f65ac7b5cedac49d"},{url:"/_next/static/Z5E6vYjSI5JHNvzj5szUd/pages/_error.js",revision:"99c6d686d3f8ebade28515dbaaa0fc28"},{url:"/_next/static/chunks/0968407a7758269248166f3a21ef3fe19dfb9a23.9ecda3ac75cb8f3930e7.js",revision:"f24efe7f1bbcc39853be93fc936f1b52"},{url:"/_next/static/chunks/0c345107.4c91f751ad7c663b000d.js",revision:"aa86ddf60cba4df5c0b2b78adb146cbe"},{url:"/_next/static/chunks/63f5c4f2.c774c82160d2b8623313.js",revision:"0c900d85a8456131782a8fae4a30bd16"},{url:"/_next/static/chunks/64236d6cb5662081124e1035810b7638b4ec44c3.76f22baf49de8613e48f.js",revision:"c4be385a9d940d8b83172796bb658ef9"},{url:"/_next/static/chunks/64ab81e5.c0e9b504ea61be092976.js",revision:"9fa6b58527a933722bce5792bed77c0d"},{url:"/_next/static/chunks/94a7ad86.6162e4df6752bbad7df3.js",revision:"a56168f07914d15253fdc0f14ac3a5a0"},{url:"/_next/static/chunks/ca5bdd4d253c4174de9b348b6fc671bf14e8ce4d.2deb51eeb7508fb3a187.js",revision:"07ad30bc1732885d17de282172cc567f"},{url:"/_next/static/chunks/framework.8e8bbc89939077c3810a.js",revision:"0da6b7e14e30ecb553f9583b14dda9ed"},{url:"/_next/static/runtime/main-af1a0f84bffaa270f668.js",revision:"ea01b086cc791c87781ffb90aab469f4"},{url:"/_next/static/runtime/polyfills-2c087c487cafba482880.js",revision:"5763c70c992afc6a3f47cd0a54138be7"},{url:"/_next/static/runtime/webpack-c212667a5f965e81e004.js",revision:"f5e6e2fca3144cc944812cfa3547f475"},{url:"/images/icons/favicon.ico",revision:"d9d531f94b472a54f67d57ac078bce18"},{url:"/images/icons/icon120.png",revision:"087122a35170b05e910dbf2f305af881"},{url:"/images/icons/icon128.png",revision:"938c98686919ea54b7194181651cf96b"},{url:"/images/icons/icon144.png",revision:"13c541fd4adc1b28809ab3b37d117b9d"},{url:"/images/icons/icon152.png",revision:"b0d78faa7b4929047f280adc4e247895"},{url:"/images/icons/icon16.png",revision:"d9d531f94b472a54f67d57ac078bce18"},{url:"/images/icons/icon19.png",revision:"65421fdf631f3457f795e5ae9265e3b5"},{url:"/images/icons/icon192.png",revision:"aeb91fa1e26a8ae09de187a32d6a77c3"},{url:"/images/icons/icon32.png",revision:"800c79c38a4cb61a455b3ed5f1a7344c"},{url:"/images/icons/icon38.png",revision:"8718a03cf92e434ceee2cf68ffc8e013"},{url:"/images/icons/icon384.png",revision:"c330b46a5c8b23f7d62094c315009e03"},{url:"/images/icons/icon48.png",revision:"0e34ab44afb8ac02fb25e6ae1a5674b8"},{url:"/images/icons/icon512.png",revision:"b5746f56dd4a992c66df12dcdc32d084"},{url:"/images/icons/icon57.png",revision:"352324719951620fea051304c5c97668"},{url:"/images/icons/icon72.png",revision:"7402920cf164d2c1a8c951a193edd1be"},{url:"/images/icons/icon76.png",revision:"8f0da1e312fd510e95768bf140cbce9f"},{url:"/images/icons/icon96.png",revision:"3555ff947ed4e24d72a0a640d7548094"},{url:"/images/icons/poolbase-icon.svg",revision:"4e671bc3a87d5a75ae0d012c8f04872d"},{url:"/manifest.json",revision:"a51949ecef83bf09d71005da03e87300"},{url:"/placeholder.html",revision:"d41d8cd98f00b204e9800998ecf8427e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"POST"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
