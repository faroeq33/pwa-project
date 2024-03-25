const CACHE_VERSION = "showcase-cache-v1";
// Import localforage script
// eslint-disable-next-line no-undef
importScripts(
  "https://cdn.jsdelivr.net/npm/localforage/dist/localforage.min.js"
);

// Luister naar fetch-verzoeken
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const match = (url, path) =>
    url.origin === "https://cmgt.hr.nl" && url.pathname === path;

  switch (true) {
    case match(url, "/api/projects"):
      // Sla projecten op in IndexedDB wanneer online
      event.respondWith(networkFirstThenCache(event.request));
      break;
    case match(url, "/api/tags"):
      // Geef alleen tags terug wanneer de service online is, anders geef een http-fout terug
      event.respondWith(networkOnly(event));
      break;
    default:
      // Voor alle andere verzoeken, haal gegevens op uit de cache of doe het verzoek wanneer online
      event.respondWith(cacheFirst(event));
      break;
  }
});

// Functie om de projecten op te slaan in IndexedDB
function saveDataToIndexedDB(response) {
  const dataStore = localforage.createInstance({
    name: "showcase-store",
  });
  response.json().then((data) => {
    data.data.forEach((project) => {
      dataStore
        .setItem(`project-${project.project.id}`, project)
        .catch((error) =>
          console.error(
            `Fout bij het opslaan van project ${project.project.id} in IndexedDB:`,
            error
          )
        );
    });
  });
}

// Functie om de projecten op te halen uit IndexedDB
function loadFromIndexedDB() {
  const dataStore = localforage.createInstance({
    name: "showcase-store",
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
      console.error("Fout bij het laden van gegevens uit IndexedDB:", error);
      throw error;
    });
}
function networkOnly(event) {
  return fetch(event.request)
    .then((response) => {
      return response;
    })
    .catch(() => {
      return new Response(
        JSON.stringify({
          message: "Online verbinding is vereist om tags op te halen",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    });
}

function cacheFirst(event) {
  return caches.match(event.request).then((response) => {
    // Als de cache een reactie heeft, geef deze terug
    if (response) {
      return response;
    }

    // anders doe het verzoek wanneer online
    return fetch(event.request).then((res) => {
      return caches.open(CACHE_VERSION).then((cache) => {
        cache.put(event.request.url, res.clone());
        return res;
      });
    });
  });
}

function networkFirstThenCache(request) {
  return fetch(request)
    .then((response) => {
      const responseClone = response.clone();
      saveDataToIndexedDB(responseClone);
      return response;
    })
    .catch(() => {
      return loadFromIndexedDB();
    });
}
