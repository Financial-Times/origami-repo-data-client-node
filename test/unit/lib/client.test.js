'use strict';

const assert = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/client', () => {
	let defaults;
	let request;
	let RepoDataClient;

	beforeEach(() => {
		defaults = sinon.spy(require('lodash/defaults'));
		mockery.registerMock('lodash/defaults', defaults);

		request = require('../mock/request-promise-native.mock');
		mockery.registerMock('request-promise-native', request);

		RepoDataClient = require('../../../lib/client');
	});

	it('exports a class constructor', () => {
		assert.isFunction(RepoDataClient);
		assert.throws(() => RepoDataClient(), /constructor repodataclient/i); // eslint-disable-line new-cap
	});

	describe('new RepoDataClient(options)', () => {
		let instance;
		let options;

		beforeEach(() => {
			options = {
				mockOptions: true
			};
			RepoDataClient.defaultOptions = sinon.stub().returnsArg(0);
			instance = new RepoDataClient(options);
		});

		it('defaults the passed in options', () => {
			assert.calledOnce(RepoDataClient.defaultOptions);
			assert.calledWithExactly(RepoDataClient.defaultOptions, options);
		});

		describe('.options', () => {

			it('is set to the defaulted options', () => {
				assert.strictEqual(instance.options, RepoDataClient.defaultOptions.firstCall.returnValue);
			});

		});

		describe('.listRepos()', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.listRepos();
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/repos');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});
		});

		describe('.listBrandedRepos(brand)', () => {
			let returnValue;
			let response;
			let brand;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				brand = 'master';
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.listBrandedRepos(brand);
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, `/v1/repos?brand=${brand}`);
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});
		});

		describe('.getRepo(repoId)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.getRepo('mock-repo-id');
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/repos/mock-repo-id');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.listVersions(repoId)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.listVersions('mock-repo-id');
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/repos/mock-repo-id/versions');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.getVersion(repoId, versionId)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.getVersion('mock-repo-id', 'mock-version-id');
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/repos/mock-repo-id/versions/mock-version-id');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.getManifest(repoId, versionId, manifestType)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.getManifest('mock-repo-id', 'mock-version-id', 'mock-manifest-type');
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/repos/mock-repo-id/versions/mock-version-id/manifests/mock-manifest-type');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.getMarkdown(repoId, versionId, markdownType)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.getMarkdown('mock-repo-id', 'mock-version-id', 'mock-markdown-type');
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/repos/mock-repo-id/versions/mock-version-id/markdown/mock-markdown-type');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.getReadme(repoId, versionId)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.getReadme('mock-repo-id', 'mock-version-id');
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/repos/mock-repo-id/versions/mock-version-id/markdown/readme');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.listDemos(repoId, versionId)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.listDemos('mock-repo-id', 'mock-version-id');
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/repos/mock-repo-id/versions/mock-version-id/demos', {});
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.listDemos(repoId, versionId, brand)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.listDemos('mock-repo-id', 'mock-version-id', 'mock-brand');
			});

			it('calls `instance.get` with the expected endpoint and query parameters', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/repos/mock-repo-id/versions/mock-version-id/demos', {
					brand: 'mock-brand'
				});
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.listImages(repoId, versionId, imageOptions)', () => {
			let imageOptions;
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				imageOptions = {
					sourceParam: 'mock-source-param',
					otherParam: 'mock'
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.listImages('mock-repo-id', 'mock-version-id', imageOptions);
			});

			it('calls `instance.get` with the expected endpoint and query parameters', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/repos/mock-repo-id/versions/mock-version-id/images', {
					sourceParam: 'mock-source-param'
				});
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

			describe('when `imageOptions` is not defined', () => {

				beforeEach(async () => {
					instance.get.resetHistory();
					returnValue = await instance.listImages('mock-repo-id', 'mock-version-id');
				});

				it('calls `instance.get` with the expected endpoint and query parameters', () => {
					assert.calledOnce(instance.get);
					assert.calledWithExactly(instance.get, '/v1/repos/mock-repo-id/versions/mock-version-id/images', {
						sourceParam: 'origami-repo-data-client-node'
					});
				});

				it('resolves with the response', () => {
					assert.strictEqual(returnValue, response);
				});

			});

		});

		describe('.listDependencies(repoId, versionId)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.listDependencies('mock-repo-id', 'mock-version-id');
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/repos/mock-repo-id/versions/mock-version-id/dependencies');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.createKey(data)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.post = sinon.stub().resolves(response);
				returnValue = await instance.createKey('mock-data');
			});

			it('calls `instance.post` with the expected endpoint', () => {
				assert.calledOnce(instance.post);
				assert.calledWithExactly(instance.post, '/v1/keys', 'mock-data');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.listKeys()', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.listKeys();
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/keys');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.getKey(keyId)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.getKey('mock-key-id');
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/keys/mock-key-id');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.deleteKey(keyId)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.delete = sinon.stub().resolves(response);
				returnValue = await instance.deleteKey('mock-key-id');
			});

			it('calls `instance.delete` with the expected endpoint', () => {
				assert.calledOnce(instance.delete);
				assert.calledWithExactly(instance.delete, '/v1/keys/mock-key-id');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.createIngestion(data)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.post = sinon.stub().resolves(response);
				returnValue = await instance.createIngestion('mock-data');
			});

			it('calls `instance.post` with the expected endpoint', () => {
				assert.calledOnce(instance.post);
				assert.calledWithExactly(instance.post, '/v1/queue', 'mock-data');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.listIngestions()', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.listIngestions();
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/queue');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.getIngestion(ingestionId)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.get = sinon.stub().resolves(response);
				returnValue = await instance.getIngestion('mock-ingestion-id');
			});

			it('calls `instance.get` with the expected endpoint', () => {
				assert.calledOnce(instance.get);
				assert.calledWithExactly(instance.get, '/v1/queue/mock-ingestion-id');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.deleteIngestion()', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.delete = sinon.stub().resolves(response);
				returnValue = await instance.deleteIngestion('mock-ingestion-id');
			});

			it('calls `instance.delete` with the expected endpoint', () => {
				assert.calledOnce(instance.delete);
				assert.calledWithExactly(instance.delete, '/v1/queue/mock-ingestion-id');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.get(endpoint)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.request = sinon.stub().resolves(response);
				returnValue = await instance.get('/mock-endpoint', 'mock-query');
			});

			it('calls `instance.request` with the expected method and endpoint', () => {
				assert.calledOnce(instance.request);
				assert.calledWithExactly(instance.request, 'GET', '/mock-endpoint', 'mock-query');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.post(endpoint, data)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.request = sinon.stub().resolves(response);
				returnValue = await instance.post('/mock-endpoint', 'mock-data');
			});

			it('calls `instance.request` with the expected method, endpoint, and data', () => {
				assert.calledOnce(instance.request);
				assert.calledWithExactly(instance.request, 'POST', '/mock-endpoint', undefined, 'mock-data');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.delete(endpoint)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					mockResponse: true
				};
				instance.request = sinon.stub().resolves(response);
				returnValue = await instance.delete('/mock-endpoint');
			});

			it('calls `instance.request` with the expected method and endpoint', () => {
				assert.calledOnce(instance.request);
				assert.calledWithExactly(instance.request, 'DELETE', '/mock-endpoint');
			});

			it('resolves with the response', () => {
				assert.strictEqual(returnValue, response);
			});

		});

		describe('.request(method, endpoint, query, data)', () => {
			let returnValue;
			let response;

			beforeEach(async () => {
				response = {
					statusCode: 200,
					body: {
						mockBody: true
					}
				};
				request.resolves(response);
				instance.options = {
					apiKey: 'mock-api-key',
					apiSecret: 'mock-api-secret',
					apiUrl: 'https://mock.api.url'
				};
				returnValue = await instance.request('mock-method', '/mock-endpoint', 'mock-query', 'mock-data');
			});

			it('calls `request` with the expected configuration', () => {
				assert.calledOnce(request);
				assert.calledWithExactly(request, {
					method: 'mock-method',
					uri: 'https://mock.api.url/mock-endpoint',
					qs: 'mock-query',
					headers: {
						'X-Api-Key': 'mock-api-key',
						'X-Api-Secret': 'mock-api-secret'
					},
					body: 'mock-data',
					resolveWithFullResponse: true,
					simple: false,
					json: true
				});
			});

			it('resolves with the response body', () => {
				assert.strictEqual(returnValue, response.body);
			});

			describe('when the response body is empty', () => {

				beforeEach(async () => {
					response.body = '';
					returnValue = await instance.request('mock-method', '/mock-endpoint', 'mock-data');
				});

				it('resolves with `undefined`', () => {
					assert.isUndefined(returnValue);
				});

			});

			describe('when the response is an error', () => {
				let caughtError;

				beforeEach(async () => {
					response.statusCode = 400;
					response.body.message = 'mock-error-message';
					try {
						await instance.request('mock-method', '/mock-endpoint', 'mock-data');
					} catch (error) {
						caughtError = error;
					}
				});

				it('rejects with an error which includes the error details', () => {
					assert.instanceOf(caughtError, Error);
					assert.strictEqual(caughtError.message, 'mock-error-message');
					assert.strictEqual(caughtError.status, 400);
				});

			});

			describe('when the response is a validation error', () => {
				let caughtError;

				beforeEach(async () => {
					response.statusCode = 400;
					response.body.message = 'mock-error-message';
					response.body.validation = [
						'mock-validation-error-1',
						'mock-validation-error-2'
					];
					try {
						await instance.request('mock-method', '/mock-endpoint', 'mock-data');
					} catch (error) {
						caughtError = error;
					}
				});

				it('rejects with an error which includes the error details', () => {
					assert.instanceOf(caughtError, Error);
					assert.strictEqual(caughtError.message, 'mock-error-message: mock-validation-error-1, mock-validation-error-2');
					assert.strictEqual(caughtError.status, 400);
				});

			});

			describe('when `request` throws an error', () => {
				let caughtError;
				let requestError;

				beforeEach(async () => {
					requestError = new Error('mock-request-error');
					request.rejects(requestError);
					try {
						await instance.request('mock-method', '/mock-endpoint', 'mock-data');
					} catch (error) {
						caughtError = error;
					}
				});

				it('rejects with the request error', () => {
					assert.strictEqual(caughtError, requestError);
				});

			});

		});

	});

	describe('RepoDataClient.defaultOptions(options)', () => {
		let options;
		let environment;
		let returnValue;

		beforeEach(() => {
			environment = process.env;
			process.env = {
				REPO_DATA_API_KEY: 'mock-api-key-env',
				REPO_DATA_API_SECRET: 'mock-api-secret-env',
				REPO_DATA_API_URL: 'mock-api-url-env',
				ADDITIONAL_KEY: 'mock-additional-key-env'
			};
			options = {
				apiKey: 'mock-api-key',
				apiSecret: 'mock-api-secret',
				apiUrl: 'mock-api-url'
			};
			returnValue = RepoDataClient.defaultOptions(options);
		});

		afterEach(() => {
			process.env = environment;
		});

		it('defaults the passed in options', () => {
			assert.calledOnce(defaults);
			assert.isObject(defaults.firstCall.args[0]);
			assert.strictEqual(defaults.firstCall.args[1], options);
			assert.deepEqual(defaults.firstCall.args[2], {
				apiKey: 'mock-api-key-env',
				apiSecret: 'mock-api-secret-env',
				apiUrl: 'mock-api-url-env'
			});
			assert.deepEqual(defaults.firstCall.args[3], {
				apiUrl: 'https://origami-repo-data.ft.com'
			});
		});

		it('returns the defaulted options', () => {
			assert.strictEqual(returnValue, defaults.firstCall.returnValue);
		});

	});

});
