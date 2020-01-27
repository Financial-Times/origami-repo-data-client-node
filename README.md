
# Origami Repo Data Client (Node.js)

A Node.js client for the Origami Repo Data service.

[![NPM version](https://img.shields.io/npm/v/@financial-times/origami-repo-data-client.svg)](https://www.npmjs.com/package/@financial-times/origami-repo-data-client)
[![Build status](https://img.shields.io/circleci/project/Financial-Times/origami-repo-data-client-node.svg)](https://circleci.com/gh/Financial-Times/origami-repo-data-client-node)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)][license]

```js
const RepoDataClient = require('@financial-times/origami-repo-data-client');

const repoData = new RepoDataClient({
    apiKey: 'xxxXxXxX-XXXX-XXXX-xXXx-xxxXXXxXXXXX',
    apiSecret: 'xxXXXxxXXXXXXXXXxxxxxxxXXXxXxXXXXXXxxXXx'
});

const repos = await repoData.listRepos();
```


## Table Of Contents

  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Publishing](#publishing)
  - [Support and Migration](#support-and-migration)
  - [Contact](#contact)
  - [Licence](#licence)


## Usage

Using this module requires [Node.js] 6.x and [npm]. You can install with:

```sh
npm install @financial-times/origami-repo-data-client
```

The [full API documentation][api-docs] explains how to use this module.


## Contributing

This module has a full suite of unit tests, and is verified with ESLint. You can use the following commands to check your code before opening a pull request:

```sh
make verify  # verify JavaScript code with ESLint
make test    # run the unit tests and check coverage
```


## Publishing

New versions of the module are published automatically by CI when a new tag is created matching the pattern `/v.*/`.


## Contact

If you have any questions or comments about this module, or need help using it, please either [raise an issue][issues], visit [#origami-support] or email [Origami Support].


## Licence

This software is published by the Financial Times under the [MIT licence][license].



[#origami-support]: https://financialtimes.slack.com/messages/origami-support/
[api-docs]: https://financial-times.github.io/origami-repo-data-client-node/
[issues]: https://github.com/Financial-Times/origami-repo-data-client-node/issues
[license]: http://opensource.org/licenses/MIT
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[origami support]: mailto:origami-support@ft.com
