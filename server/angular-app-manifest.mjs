
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/storia",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KTKZNOLZ.js",
      "chunk-U6UMCPF5.js"
    ],
    "route": "/storia"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6UNL2IAF.js",
      "chunk-U6UMCPF5.js"
    ],
    "route": "/lavori"
  },
  {
    "renderMode": 2,
    "redirectTo": "/storia",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1234, hash: '77cbaca5f7a3d185265956cbc8ae5b06e580f80b893678652afba86ea43e7801', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1007, hash: '7540085aa9f44ea440c7b1b9bd54db704f6c89e688278923e20621d96d88387b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'storia/index.html': {size: 10689, hash: '370697a92d16c67501cff6d1ee01561ecf6b265cfe8c02ef9453d92f94935597', text: () => import('./assets-chunks/storia_index_html.mjs').then(m => m.default)},
    'lavori/index.html': {size: 11069, hash: '25c87eb85f4ac5397bdb337ce534234068823dc364a7703d22423b5dc753854c', text: () => import('./assets-chunks/lavori_index_html.mjs').then(m => m.default)},
    'styles-GN34QTSL.css': {size: 725, hash: 'LiBvWGjojlk', text: () => import('./assets-chunks/styles-GN34QTSL_css.mjs').then(m => m.default)}
  },
};
