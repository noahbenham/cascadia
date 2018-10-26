import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.twitch.tv/',
  params: {
    client_id: 'bg6zr7v8yvtd5nrh2lcbeblfkt53bp',
  },
});

export function searchGames(query) {
  return instance({
    url: '/kraken/search/games',
    params: {
      query,
      type: 'suggest',
    },
  });
}
