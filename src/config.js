module.exports = {
  meta: {
    author: '',
    title: 'Heatmap',
    url: 'https://www.liberation.fr/apps/2019/07/heatmap',
    description: '',
    image: '',
    xiti_id: 'heatmap'
  },
  tracking: {
    active: false,
    format: 'fait-chaud',
    article: 'heatmap'
  },
  show_header: false,
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : 'http://localhost:3003',
  api_url: process.env.NODE_ENV === 'production'
    ? 'https://libe-labo-2.site/api'
    : 'http://localhost:3004/api',
  stylesheet: 'fait-chaud.css',
  spreadsheet: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTATp3BeeWxgyb_Wj-eLN06Mfgqej3LxIGqb1gpfcmCbRp8pb3ht11-uX_oXiYNGH9K_jaGi70vLEHK/pub?gid=0&single=true&output=tsv'
}
