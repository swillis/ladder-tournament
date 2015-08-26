// JavaScripts here!

import styles from './test.css!';

document.querySelector('body').innerHTML = `
  <div class="${styles.test}">JSPM and CSS Modules = &lt;3</div>
`;

export let __hotReload = true;
