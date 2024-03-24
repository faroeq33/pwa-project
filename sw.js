const CACHE_NAME = "pwa-cache-v1";
const CACHE_ALLOW_LIST = [CACHE_NAME];

// Import localforage script
importScripts(
  "https://cdn.jsdelivr.net/npm/localforage/dist/localforage.min.js"
);

// self.addEventListener("install", (event) => {
/*
Installation takes place. An install event is always the first one sent to a service worker (this can be used to start the process of populating an IndexedDB, and caching site assets). During this step, the application is preparing to make everything available for use offline.

*/
// TODO: uitleggen wat er bij de install event gebeurt
// event.waitUntil();
// });

// self.addEventListener("activate", (event) => {
/*
The activate event of the ServiceWorkerGlobalScope interface is fired when a ServiceWorkerRegistration acquires a new ServiceWorkerRegistration.active worker.
*/

//   console.log("Service Worker activated");

//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!CACHE_ALLOW_LIST.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// Listen for fetch requests
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Save projects to IndexDB when online
  if (url.origin === "https://cmgt.hr.nl" && url.pathname === "/api/projects") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          saveDataToIndexedDB(responseClone);
          return response;
        })
        .catch(() => {
          return loadFromIndexedDB();
        })
    );

    // Only return tags when service is online, otherwise return http error
  } else if (
    url.origin === "https://cmgt.hr.nl" &&
    url.pathname === "/api/tags"
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          //TODO: response ok?
          return response;
        })
        .catch(() => {
          return new Response(
            JSON.stringify({
              message: "Online connection is required to fetch tags",
            }),
            {
              status: 503,
              headers: { "Content-Type": "application/json" },
            }
          );
        })
    );
    // For all other requests, get data from the cache or make the request when online
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then(function (res) {
            return caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request.url, res.clone());
              return res;
            });
          });
        }
      })
    );
  }
});

// Function to store the projecst to the IndexDB

function saveDataToIndexedDB(response) {
  const dataStore = localforage.createInstance({
    name: "prg9-store",
  });
  response.json().then((data) => {
    data.data.forEach((project) => {
      dataStore
        .setItem(`project-${project.project.id}`, project)
        .catch((error) =>
          console.error(
            `Error saving project ${project.project.id} to IndexedDB:`,
            error
          )
        );
    });
  });
}

// Function to load the projecst from the IndexDB
function loadFromIndexedDB() {
  const dataStore = localforage.createInstance({
    name: "prg9-store",
  });
  return dataStore
    .keys()
    .then((keys) => Promise.all(keys.map((key) => dataStore.getItem(key))))
    .then((data) => {
      const responseData = {
        data: data,
      };
      return new Response(JSON.stringify(responseData), {
        headers: { "Content-Type": "application/json" },
      });
    })
    .catch((error) => {
      console.error("Error loading data from IndexedDB:", error);
      throw error;
    });
}
