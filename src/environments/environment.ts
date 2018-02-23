// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  fireBaseConfig: {
    apiKey: 'AIzaSyAsNt11A6q8emOvZheDqbJdbm-T5qJcGgY',
    authDomain: 'file-io.firebaseapp.com',
    databaseURL: 'https://file-io.firebaseio.com',
    projectId: 'file-io',
    storageBucket: 'file-io.appspot.com',
    messagingSenderId: '298075388145'
  }
};
