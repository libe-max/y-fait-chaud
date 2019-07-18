module.exports = {
  meta: {
    author: '',
    title: '',
    url: '',
    description: '',
    image: '',
    xiti_id: 'fait-chaud'
  },
  tracking: {
    active: false,
    format: 'fait-chaud',
    article: 'fait-chaud'
  },
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : 'http://localhost:3003',
  api_url: process.env.NODE_ENV === 'production'
    ? 'https://libe-labo.site/api'
    : 'http://localhost:3004/api',
  stylesheet: 'fait-chaud.css',
  spreadsheet: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTATp3BeeWxgyb_Wj-eLN06Mfgqej3LxIGqb1gpfcmCbRp8pb3ht11-uX_oXiYNGH9K_jaGi70vLEHK/pub?gid=0&single=true&output=tsv'
}
