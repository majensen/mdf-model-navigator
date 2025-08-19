import url from 'url';
import axios from 'axios';
import { MDFReader } from 'mdf-reader';

export function inputToUrls(text) {
  if (!text || text.length === 0) {
    return;
  }
  let urls = [];
  const lines = text.split('\n');
  lines.forEach( (line) => {
    const u = url.parse(line);
    if ( u.protocol && u.protocol.match(/^https?/) && u.host && u.pathname ) {
      urls.push(u);
    }
  });
  return urls;
}

export function loadMDFModel(...inputs) {
  let ps = inputs.map((input) => {
    // If input is a URL, fetch it
    if (input instanceof url.Url) {
      return axios.get(input.format())
        .then(r => r.data);
    }
    // else assume input is text (MDF file content)
    return Promise.resolve(input);
  });

  return Promise.all(ps)
    .then(dta => new MDFReader(...dta))
    .catch(e => { throw new Error(e); });
}
