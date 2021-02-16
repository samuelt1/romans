# Romans
Friends, countrymen, Romans!

#### Table of Contents
- [Installing NodeJS](#Installation)
  - [Windows](#InstallWindows)
  - [Mac](#InstallMacLinux)
- [Running the Controller](#Running)
- [Build for Docker](#Docker)
- [Testing](#Testing)
- [Docs](#Docs)
- [Sources](#Sources)
- [Methodology](#Methodology)
- [Dependency Graph](#Dependency)
- [Layout](#Layout)


## Installing NodeJS <a name="Installation"></a>
Install the latest stable version of NodeJS. 
#### Windows <a name="InstallWindows"></a>
From project directory:

```bash
choco install nodejs.install
npm install
```
or use the installer:
NODE INSTALLER

#### MacOS <a name="InstallMacLinux"></a>
*Brew is required*
```bash
brew install nvm
nvm install lts
```

## Running the stuff <a name="Running"></a>
For development environment, run the following command.
```
npm start
```

For production environment, run the following command.
```
npm run prod
```

## Build for Docker <a name="Docker"></a>

```bash
docker build . --tag romans:dev
```

### Run in Docker <a name ="RunInDocker"></a>

```bash
docker run -e NODE_ENV=dev romans:dev
```

<b>Note:</b> <i> Argument order on -e is very important here!</i>

## Testing <a name="Testing"></a>
Note: This can be on local workstation.

This setup uses test configuration and it is suggested you set the log level to `fatal`.

To run ALL test cases:
```
npm run test
```

## Docs <a name="Docs"></a>
Documentation can be found at http://localhost:8080/docs.

## Sources <a name="Sources"></a>

I am using the following source for roman numerals:
https://www.calculatorsoup.com/calculators/conversions/roman-numeral-converter.php

but according to this [guy](https://www.quora.com/How-is-a-billion-represented-in-Roman-Numerals) it is only mostly correct.

## Methodology <a name="Methodology"></a>

I laid out the code in a way that is best expandable. The server starts with index.js, and then follows the routes for deeper apis. The URL follows the folders this way it is very easy to know where stuff is inside of your application. All routes (there is only one here) should have a swagger doc attached to it, this gives a nice way for people to see what the API should be doing and how to use it. I did not add a beautifier, but I think one should be added to get rid of semi-colons automatically and format the code. I added CORS because that usually bites me in the butt after the application is built. For testing I tried to get 100% code completion, but because of the way that I built error handleing I could not force an error to occour without more research. I made end to end tests that show how the user would see things happen. The unit tests I made cover as many cases as I could think of. I made the only error in the roman.js file later to throw just so I could have an error to throw there. I made a special error class. The error class is so that all errors will be handled specially. This allows the stack trace to be better handled by winston, and show up better in the web browser when throwing it to the user. 

## Layout <a name="Layout"></a>

All central files to the project should be stored in the core folder. If there is any code related to a route it should be stored inside of the route. routes should follow the naming convention of the route.

The test folder should be split by the end to end tests, and the unit tests. Every route should be split into a new file with the correct name

## Notes <a name="Notes"></a>

There will need to be a few changes depending on how it is deployed into production. I belive it will work with kubernetes with a simple config map, but I have no way of testing that easily.

Metrics can be gathered through data dog pretty simply. Just adding the dd-trace and connect-datadog is enough to send all many metrics to data dog like response time. Some metrics I would create is number of successful queries to failed queries in a 10 minute window. This will let me know if there is a bug breaking something. Number of failures with the specific name of the failures. This will catch if one type of error is occuring at any time. Track the CPU, memory, number of processes in case the load gets too high at any time. I would make a metric of number of requests in the 10 minute windows to check for possible DDOS attacks, but this could also be handled very well by Cloudflare. I would track network connections to make sure we are properly closing all connections after use.

## Dependency Graph <a name="Dependency"></a>

```
romans@1.0.0 /Users/samuel_thompson/projects/romans
├─┬ chai@4.3.0
│ ├── assertion-error@1.1.0
│ ├── check-error@1.0.2
│ ├─┬ deep-eql@3.0.1
│ │ └── type-detect@4.0.8 deduped
│ ├── get-func-name@2.0.0
│ ├── pathval@1.1.1
│ └── type-detect@4.0.8
├─┬ chai-http@4.3.0
│ ├── @types/chai@4.2.15
│ ├─┬ @types/superagent@3.8.7
│ │ ├── @types/cookiejar@2.1.2
│ │ └── @types/node@14.14.28
│ ├── cookiejar@2.1.2
│ ├─┬ is-ip@2.0.0
│ │ └── ip-regex@2.1.0
│ ├── methods@1.1.2
│ ├── qs@6.9.6
│ └─┬ superagent@3.8.3
│   ├── component-emitter@1.3.0
│   ├── cookiejar@2.1.2 deduped
│   ├─┬ debug@3.2.7
│   │ └── ms@2.1.3 deduped
│   ├── extend@3.0.2
│   ├─┬ form-data@2.5.1
│   │ ├── asynckit@0.4.0
│   │ ├─┬ combined-stream@1.0.8
│   │ │ └── delayed-stream@1.0.0
│   │ └── mime-types@2.1.28 deduped
│   ├── formidable@1.2.2
│   ├── methods@1.1.2 deduped
│   ├── mime@1.6.0
│   ├── qs@6.9.6 deduped
│   └─┬ readable-stream@2.3.7
│     ├── core-util-is@1.0.2
│     ├── inherits@2.0.4 deduped
│     ├── isarray@1.0.0
│     ├── process-nextick-args@2.0.1
│     ├── safe-buffer@5.1.2
│     ├── string_decoder@1.1.1 deduped
│     └── util-deprecate@1.0.2 deduped
├─┬ config@3.3.3
│ └─┬ json5@2.2.0
│   └── minimist@1.2.5
├─┬ cors@2.8.5
│ ├── object-assign@4.1.1
│ └── vary@1.1.2
├─┬ express@4.17.1
│ ├─┬ accepts@1.3.7
│ │ ├─┬ mime-types@2.1.28
│ │ │ └── mime-db@1.45.0
│ │ └── negotiator@0.6.2
│ ├── array-flatten@1.1.1
│ ├─┬ body-parser@1.19.0
│ │ ├── bytes@3.1.0
│ │ ├── content-type@1.0.4 deduped
│ │ ├─┬ debug@2.6.9
│ │ │ └── ms@2.0.0
│ │ ├── depd@1.1.2 deduped
│ │ ├─┬ http-errors@1.7.2
│ │ │ ├── depd@1.1.2 deduped
│ │ │ ├── inherits@2.0.3
│ │ │ ├── setprototypeof@1.1.1 deduped
│ │ │ ├── statuses@1.5.0 deduped
│ │ │ └── toidentifier@1.0.0
│ │ ├─┬ iconv-lite@0.4.24
│ │ │ └── safer-buffer@2.1.2
│ │ ├── on-finished@2.3.0 deduped
│ │ ├── qs@6.7.0
│ │ ├─┬ raw-body@2.4.0
│ │ │ ├── bytes@3.1.0 deduped
│ │ │ ├── http-errors@1.7.2 deduped
│ │ │ ├── iconv-lite@0.4.24 deduped
│ │ │ └── unpipe@1.0.0 deduped
│ │ └── type-is@1.6.18 deduped
│ ├─┬ content-disposition@0.5.3
│ │ └── safe-buffer@5.1.2
│ ├── content-type@1.0.4
│ ├── cookie@0.4.0
│ ├── cookie-signature@1.0.6
│ ├─┬ debug@2.6.9
│ │ └── ms@2.0.0
│ ├── depd@1.1.2
│ ├── encodeurl@1.0.2
│ ├── escape-html@1.0.3
│ ├── etag@1.8.1
│ ├─┬ finalhandler@1.1.2
│ │ ├─┬ debug@2.6.9
│ │ │ └── ms@2.0.0
│ │ ├── encodeurl@1.0.2 deduped
│ │ ├── escape-html@1.0.3 deduped
│ │ ├── on-finished@2.3.0 deduped
│ │ ├── parseurl@1.3.3 deduped
│ │ ├── statuses@1.5.0 deduped
│ │ └── unpipe@1.0.0
│ ├── fresh@0.5.2
│ ├── merge-descriptors@1.0.1
│ ├── methods@1.1.2 deduped
│ ├─┬ on-finished@2.3.0
│ │ └── ee-first@1.1.1
│ ├── parseurl@1.3.3
│ ├── path-to-regexp@0.1.7
│ ├─┬ proxy-addr@2.0.6
│ │ ├── forwarded@0.1.2
│ │ └── ipaddr.js@1.9.1
│ ├── qs@6.7.0
│ ├── range-parser@1.2.1
│ ├── safe-buffer@5.1.2
│ ├─┬ send@0.17.1
│ │ ├─┬ debug@2.6.9
│ │ │ └── ms@2.0.0
│ │ ├── depd@1.1.2 deduped
│ │ ├── destroy@1.0.4
│ │ ├── encodeurl@1.0.2 deduped
│ │ ├── escape-html@1.0.3 deduped
│ │ ├── etag@1.8.1 deduped
│ │ ├── fresh@0.5.2 deduped
│ │ ├── http-errors@1.7.2 deduped
│ │ ├── mime@1.6.0 deduped
│ │ ├── ms@2.1.1
│ │ ├── on-finished@2.3.0 deduped
│ │ ├── range-parser@1.2.1 deduped
│ │ └── statuses@1.5.0 deduped
│ ├─┬ serve-static@1.14.1
│ │ ├── encodeurl@1.0.2 deduped
│ │ ├── escape-html@1.0.3 deduped
│ │ ├── parseurl@1.3.3 deduped
│ │ └── send@0.17.1 deduped
│ ├── setprototypeof@1.1.1
│ ├── statuses@1.5.0
│ ├─┬ type-is@1.6.18
│ │ ├── media-typer@0.3.0
│ │ └── mime-types@2.1.28 deduped
│ ├── utils-merge@1.0.1
│ └── vary@1.1.2 deduped
├─┬ mocha@8.3.0
│ ├── @ungap/promise-all-settled@1.1.2
│ ├── ansi-colors@4.1.1
│ ├── browser-stdout@1.3.1
│ ├─┬ chokidar@3.5.1
│ │ ├─┬ anymatch@3.1.1
│ │ │ ├── normalize-path@3.0.0 deduped
│ │ │ └── picomatch@2.2.2
│ │ ├─┬ braces@3.0.2
│ │ │ └─┬ fill-range@7.0.1
│ │ │   └─┬ to-regex-range@5.0.1
│ │ │     └── is-number@7.0.0
│ │ ├── fsevents@2.3.2
│ │ ├─┬ glob-parent@5.1.1
│ │ │ └── is-glob@4.0.1 deduped
│ │ ├─┬ is-binary-path@2.1.0
│ │ │ └── binary-extensions@2.2.0
│ │ ├─┬ is-glob@4.0.1
│ │ │ └── is-extglob@2.1.1
│ │ ├── normalize-path@3.0.0
│ │ └─┬ readdirp@3.5.0
│ │   └── picomatch@2.2.2 deduped
│ ├─┬ debug@4.3.1
│ │ └── ms@2.1.2
│ ├── diff@5.0.0
│ ├── escape-string-regexp@4.0.0
│ ├─┬ find-up@5.0.0
│ │ ├─┬ locate-path@6.0.0
│ │ │ └─┬ p-locate@5.0.0
│ │ │   └─┬ p-limit@3.1.0
│ │ │     └── yocto-queue@0.1.0
│ │ └── path-exists@4.0.0
│ ├─┬ glob@7.1.6
│ │ ├── fs.realpath@1.0.0
│ │ ├─┬ inflight@1.0.6
│ │ │ ├── once@1.4.0 deduped
│ │ │ └── wrappy@1.0.2
│ │ ├── inherits@2.0.4
│ │ ├── minimatch@3.0.4 deduped
│ │ ├─┬ once@1.4.0
│ │ │ └── wrappy@1.0.2 deduped
│ │ └── path-is-absolute@1.0.1
│ ├── growl@1.10.5
│ ├── he@1.2.0
│ ├─┬ js-yaml@4.0.0
│ │ └── argparse@2.0.1
│ ├─┬ log-symbols@4.0.0
│ │ └─┬ chalk@4.1.0
│ │   ├─┬ ansi-styles@4.3.0
│ │   │ └─┬ color-convert@2.0.1
│ │   │   └── color-name@1.1.4
│ │   └─┬ supports-color@7.2.0
│ │     └── has-flag@4.0.0 deduped
│ ├─┬ minimatch@3.0.4
│ │ └─┬ brace-expansion@1.1.11
│ │   ├── balanced-match@1.0.0
│ │   └── concat-map@0.0.1
│ ├── ms@2.1.3
│ ├── nanoid@3.1.20
│ ├─┬ serialize-javascript@5.0.1
│ │ └─┬ randombytes@2.1.0
│ │   └── safe-buffer@5.2.1
│ ├── strip-json-comments@3.1.1
│ ├─┬ supports-color@8.1.1
│ │ └── has-flag@4.0.0
│ ├─┬ which@2.0.2
│ │ └── isexe@2.0.0
│ ├─┬ wide-align@1.1.3
│ │ └─┬ string-width@2.1.1
│ │   ├── is-fullwidth-code-point@2.0.0
│ │   └─┬ strip-ansi@4.0.0
│ │     └── ansi-regex@3.0.0
│ ├── workerpool@6.1.0
│ ├─┬ yargs@16.2.0
│ │ ├─┬ cliui@7.0.4
│ │ │ ├─┬ string-width@4.2.0
│ │ │ │ ├── emoji-regex@8.0.0 deduped
│ │ │ │ ├── is-fullwidth-code-point@3.0.0
│ │ │ │ └── strip-ansi@6.0.0 deduped
│ │ │ ├─┬ strip-ansi@6.0.0
│ │ │ │ └── ansi-regex@5.0.0
│ │ │ └─┬ wrap-ansi@7.0.0
│ │ │   ├── ansi-styles@4.3.0 deduped
│ │ │   ├─┬ string-width@4.2.0
│ │ │   │ ├── emoji-regex@8.0.0 deduped
│ │ │   │ ├── is-fullwidth-code-point@3.0.0
│ │ │   │ └── strip-ansi@6.0.0 deduped
│ │ │   └─┬ strip-ansi@6.0.0
│ │ │     └── ansi-regex@5.0.0
│ │ ├── escalade@3.1.1
│ │ ├── get-caller-file@2.0.5
│ │ ├── require-directory@2.1.1
│ │ ├─┬ string-width@4.2.0
│ │ │ ├── emoji-regex@8.0.0
│ │ │ ├── is-fullwidth-code-point@3.0.0
│ │ │ └─┬ strip-ansi@6.0.0
│ │ │   └── ansi-regex@5.0.0
│ │ ├── y18n@5.0.5
│ │ └── yargs-parser@20.2.4 deduped
│ ├── yargs-parser@20.2.4
│ └─┬ yargs-unparser@2.0.0
│   ├── camelcase@6.2.0
│   ├── decamelize@4.0.0
│   ├── flat@5.0.2
│   └── is-plain-obj@2.1.0
├─┬ nodemon@2.0.7
│ ├── chokidar@3.5.1 deduped
│ ├─┬ debug@3.2.7
│ │ └── ms@2.1.3 deduped
│ ├── ignore-by-default@1.0.1
│ ├── minimatch@3.0.4 deduped
│ ├── pstree.remy@1.1.8
│ ├── semver@5.7.1
│ ├─┬ supports-color@5.5.0
│ │ └── has-flag@3.0.0
│ ├─┬ touch@3.1.0
│ │ └─┬ nopt@1.0.10
│ │   └── abbrev@1.1.1
│ ├─┬ undefsafe@2.0.3
│ │ └─┬ debug@2.6.9
│ │   └── ms@2.0.0
│ └─┬ update-notifier@4.1.3
│   ├─┬ boxen@4.2.0
│   │ ├─┬ ansi-align@3.0.0
│   │ │ └─┬ string-width@3.1.0
│   │ │   ├── emoji-regex@7.0.3
│   │ │   ├── is-fullwidth-code-point@2.0.0 deduped
│   │ │   └─┬ strip-ansi@5.2.0
│   │ │     └── ansi-regex@4.1.0
│   │ ├── camelcase@5.3.1
│   │ ├─┬ chalk@3.0.0
│   │ │ ├── ansi-styles@4.3.0 deduped
│   │ │ └─┬ supports-color@7.2.0
│   │ │   └── has-flag@4.0.0 deduped
│   │ ├── cli-boxes@2.2.1
│   │ ├─┬ string-width@4.2.0
│   │ │ ├── emoji-regex@8.0.0 deduped
│   │ │ ├── is-fullwidth-code-point@3.0.0
│   │ │ └─┬ strip-ansi@6.0.0
│   │ │   └── ansi-regex@5.0.0
│   │ ├── term-size@2.2.1
│   │ ├── type-fest@0.8.1
│   │ └─┬ widest-line@3.1.0
│   │   └─┬ string-width@4.2.0
│   │     ├── emoji-regex@8.0.0 deduped
│   │     ├── is-fullwidth-code-point@3.0.0
│   │     └─┬ strip-ansi@6.0.0
│   │       └── ansi-regex@5.0.0
│   ├─┬ chalk@3.0.0
│   │ ├── ansi-styles@4.3.0 deduped
│   │ └─┬ supports-color@7.2.0
│   │   └── has-flag@4.0.0 deduped
│   ├─┬ configstore@5.0.1
│   │ ├─┬ dot-prop@5.3.0
│   │ │ └── is-obj@2.0.0
│   │ ├── graceful-fs@4.2.6
│   │ ├── make-dir@3.1.0 deduped
│   │ ├─┬ unique-string@2.0.0
│   │ │ └── crypto-random-string@2.0.0
│   │ ├── write-file-atomic@3.0.3 deduped
│   │ └── xdg-basedir@4.0.0 deduped
│   ├── has-yarn@2.1.0
│   ├── import-lazy@2.1.0
│   ├─┬ is-ci@2.0.0
│   │ └── ci-info@2.0.0
│   ├─┬ is-installed-globally@0.3.2
│   │ ├─┬ global-dirs@2.1.0
│   │ │ └── ini@1.3.7
│   │ └── is-path-inside@3.0.2
│   ├── is-npm@4.0.0
│   ├── is-yarn-global@0.3.0
│   ├─┬ latest-version@5.1.0
│   │ └─┬ package-json@6.5.0
│   │   ├─┬ got@9.6.0
│   │   │ ├── @sindresorhus/is@0.14.0
│   │   │ ├─┬ @szmarczak/http-timer@1.1.2
│   │   │ │ └── defer-to-connect@1.1.3
│   │   │ ├─┬ cacheable-request@6.1.0
│   │   │ │ ├─┬ clone-response@1.0.2
│   │   │ │ │ └── mimic-response@1.0.1 deduped
│   │   │ │ ├─┬ get-stream@5.2.0
│   │   │ │ │ └── pump@3.0.0 deduped
│   │   │ │ ├── http-cache-semantics@4.1.0
│   │   │ │ ├─┬ keyv@3.1.0
│   │   │ │ │ └── json-buffer@3.0.0
│   │   │ │ ├── lowercase-keys@2.0.0
│   │   │ │ ├── normalize-url@4.5.0
│   │   │ │ └─┬ responselike@1.0.2
│   │   │ │   └── lowercase-keys@1.0.1 deduped
│   │   │ ├─┬ decompress-response@3.3.0
│   │   │ │ └── mimic-response@1.0.1 deduped
│   │   │ ├── duplexer3@0.1.4
│   │   │ ├─┬ get-stream@4.1.0
│   │   │ │ └─┬ pump@3.0.0
│   │   │ │   ├─┬ end-of-stream@1.4.4
│   │   │ │   │ └── once@1.4.0 deduped
│   │   │ │   └── once@1.4.0 deduped
│   │   │ ├── lowercase-keys@1.0.1
│   │   │ ├── mimic-response@1.0.1
│   │   │ ├── p-cancelable@1.1.0
│   │   │ ├── to-readable-stream@1.0.0
│   │   │ └─┬ url-parse-lax@3.0.0
│   │   │   └── prepend-http@2.0.0
│   │   ├─┬ registry-auth-token@4.2.1
│   │   │ └─┬ rc@1.2.8
│   │   │   ├── deep-extend@0.6.0
│   │   │   ├── ini@1.3.7 deduped
│   │   │   ├── minimist@1.2.5 deduped
│   │   │   └── strip-json-comments@2.0.1
│   │   ├─┬ registry-url@5.1.0
│   │   │ └── rc@1.2.8 deduped
│   │   └── semver@6.3.0 deduped
│   ├─┬ pupa@2.1.1
│   │ └── escape-goat@2.1.1
│   ├─┬ semver-diff@3.1.1
│   │ └── semver@6.3.0 deduped
│   └── xdg-basedir@4.0.0
├─┬ nyc@15.1.0
│ ├─┬ @istanbuljs/load-nyc-config@1.1.0
│ │ ├── camelcase@5.3.1
│ │ ├─┬ find-up@4.1.0
│ │ │ ├─┬ locate-path@5.0.0
│ │ │ │ └─┬ p-locate@4.1.0
│ │ │ │   └─┬ p-limit@2.3.0
│ │ │ │     └── p-try@2.2.0 deduped
│ │ │ └── path-exists@4.0.0 deduped
│ │ ├── get-package-type@0.1.0 deduped
│ │ ├─┬ js-yaml@3.14.1
│ │ │ ├─┬ argparse@1.0.10
│ │ │ │ └── sprintf-js@1.0.3
│ │ │ └── esprima@4.0.1
│ │ └── resolve-from@5.0.0 deduped
│ ├── @istanbuljs/schema@0.1.3
│ ├─┬ caching-transform@4.0.0
│ │ ├─┬ hasha@5.2.2
│ │ │ ├── is-stream@2.0.0 deduped
│ │ │ └── type-fest@0.8.1 deduped
│ │ ├── make-dir@3.1.0 deduped
│ │ ├─┬ package-hash@4.0.0
│ │ │ ├── graceful-fs@4.2.6 deduped
│ │ │ ├── hasha@5.2.2 deduped
│ │ │ ├── lodash.flattendeep@4.4.0
│ │ │ └─┬ release-zalgo@1.0.0
│ │ │   └── es6-error@4.1.1
│ │ └─┬ write-file-atomic@3.0.3
│ │   ├── imurmurhash@0.1.4
│ │   ├── is-typedarray@1.0.0
│ │   ├── signal-exit@3.0.3 deduped
│ │   └─┬ typedarray-to-buffer@3.1.5
│ │     └── is-typedarray@1.0.0 deduped
│ ├─┬ convert-source-map@1.7.0
│ │ └── safe-buffer@5.1.2
│ ├── decamelize@1.2.0
│ ├─┬ find-cache-dir@3.3.1
│ │ ├── commondir@1.0.1
│ │ ├── make-dir@3.1.0 deduped
│ │ └─┬ pkg-dir@4.2.0
│ │   └─┬ find-up@4.1.0
│ │     ├─┬ locate-path@5.0.0
│ │     │ └─┬ p-locate@4.1.0
│ │     │   └─┬ p-limit@2.3.0
│ │     │     └── p-try@2.2.0 deduped
│ │     └── path-exists@4.0.0 deduped
│ ├─┬ find-up@4.1.0
│ │ ├─┬ locate-path@5.0.0
│ │ │ └─┬ p-locate@4.1.0
│ │ │   └─┬ p-limit@2.3.0
│ │ │     └── p-try@2.2.0
│ │ └── path-exists@4.0.0 deduped
│ ├─┬ foreground-child@2.0.0
│ │ ├─┬ cross-spawn@7.0.3
│ │ │ ├── path-key@3.1.1
```
