# Romans
Friends, countrymen, Romans!

#### Table of Contents
- [Installing NodeJS](#Installation)
  - [Windows](#InstallWindows)
  - [Mac](#InstallMacLinux)
- [Running the Controller](#Running)
- [Build for Docker](#Docker)
- [Testing](#Testing)


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

## Sourcees <a name="Sources"></a>

I am using the following source for roman numerals:
https://www.calculatorsoup.com/calculators/conversions/roman-numeral-converter.php

but according to this <a name="guy" url="https://www.quora.com/How-is-a-billion-represented-in-Roman-Numerals"> it is only mostly correct.
