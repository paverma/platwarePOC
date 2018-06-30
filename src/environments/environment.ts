// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  envProps : {
    orgId: 'KOTAK',
    appId: 'KOTAKDO',
    clientId : 'KOTAK~KOTAKDO',
    securityKey: "51ba2618-e7ba-41b2-8eea-99009d5d51ab",
    platform: 'WEB'
  },
  // url:'http://203.112.149.200:443/router/engine/v1'
  url:"http://192.168.1.67:9002/router/engine/v1"
};
