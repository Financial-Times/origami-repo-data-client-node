'use strict';

const defaults = require('lodash/defaults');
const request = require('request-promise-native');

/**
 * Class representing an Origami Repo Data client.
 *
 * @example <caption>Create a client</caption>
 * const repoData = new RepoDataClient({
 *     apiKey: 'xxxXxXxX-XXXX-XXXX-xXXx-xxxXXXxXXXXX',
 *     apiSecret: 'xxXXXxxXXXXXXXXXxxxxxxxXXXxXxXXXXXXxxXXx'
 * });
 */
class RepoDataClient {

	/**
	 * Create an Origami Repo Data client.
	 * @param {Object} [options] - The client options.
	 * @param {String} [options.apiKey] - The API key to use when making requests.
	 * Defaults to the value of the <code>REPO_DATA_API_KEY</code> environment variable.
	 * @param {String} [options.apiSecret] - The API secret to use when making requests.
	 * Defaults to the value of the <code>REPO_DATA_API_SECRET</code> environment variable.
	 * @param {String} [options.apiUrl] - The URL of the Origami Repo Data service.
	 * Defaults to the value of the <code>REPO_DATA_API_URL</code> environment variable or the production service.
	 * @returns {RepoDataClient} A new RepoDataClient instance.
	 */
	constructor(options) {
		this.options = RepoDataClient.defaultOptions(options);
	}

	/**
	 * Get a list of all available Origami repositories as an array.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/repositories#get-v1-repos}
	 * @returns {Promise<Array>} A promise which resolves with the repositories.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>List repositories</caption>
	 * const repos = await repoData.listRepos();
	 */
	listRepos() {
		return this.get('/v1/repos');
	}

	/**
	 * Get a single Origami repository by ID or name.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/repositories#get-v1-repos-(id)}
	 * @param {String} repoId - The repository UUID or name. Warning: using name over ID incurs a redirect.
	 * @returns {Promise<Object>} A promise which resolves with the repository.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Get a repository using a UUID</caption>
	 * const repo = await repoData.getRepo('c3a499f8-3d20-503c-95b0-c4705bc272b3');
	 *
	 * @example <caption>Get a repository using a name</caption>
	 * const repo = await repoData.getRepo('origami-repo-data');
	 */
	getRepo(repoId) {
		return this.get(`/v1/repos/${repoId}`);
	}

	/**
	 * Get a list of all versions for an Origami repository as an array.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/repositories#get-v1-repos-(id)-versions}
	 * @param {String} repoId - The repository UUID or name. Warning: using name over ID incurs a redirect.
	 * @returns {Promise<Array>} A promise which resolves with the versions.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Get all repository versions using a UUID</caption>
	 * const versions = await repoData.listVersions('c3a499f8-3d20-503c-95b0-c4705bc272b3');
	 *
	 * @example <caption>Get all repository versions using a name</caption>
	 * const versions = await repoData.listVersions('origami-repo-data');
	 */
	listVersions(repoId) {
		return this.get(`/v1/repos/${repoId}/versions`);
	}

	/**
	 * Get a single version for an Origami repository by ID or name.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/repositories#get-v1-repos-(id)-versions-(id)}
	 * @param {String} repoId - The repository UUID or name. Warning: using name over ID incurs a redirect.
	 * @param {String} versionId - The version UUID or number. Warning: using number over ID incurs a redirect.
	 * @returns {Promise<Object>} A promise which resolves with the version.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Get a repository version using UUIDs</caption>
	 * const version = await repoData.getVersion('c3a499f8-3d20-503c-95b0-c4705bc272b3', 'a530dab8-f6ff-410a-9e56-8d6f49ecff2c');
	 *
	 * @example <caption>Get a repository version using a name and number</caption>
	 * const version = await repoData.getVersion('origami-repo-data', '57.0.0');
	 */
	getVersion(repoId, versionId) {
		return this.get(`/v1/repos/${repoId}/versions/${versionId}`);
	}

	/**
	 * Get a single manifest for an Origami repository and version by type.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/repositories#get-v1-repos-(id)-versions-(id)-manifests-(type)}
	 * @param {String} repoId - The repository UUID or name. Warning: using name over ID incurs a redirect.
	 * @param {String} versionId - The version UUID or number. Warning: using number over ID incurs a redirect.
	 * @param {String} manifestType - The type of manifest to retrieve. One of "about", "bower", "imageSet", "origami", or "package".
	 * @returns {Promise<Object>} A promise which resolves with the manifest file contents parsed as JSON.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Get a manifest using UUIDs</caption>
	 * const packageManifest = await repoData.getManifest('c3a499f8-3d20-503c-95b0-c4705bc272b3', 'a530dab8-f6ff-410a-9e56-8d6f49ecff2c', 'package');
	 *
	 * @example <caption>Get a manifest using a name and number</caption>
	 * const packageManifest = await repoData.getManifest('origami-repo-data', '57.0.0', 'package');
	 */
	getManifest(repoId, versionId, manifestType) {
		return this.get(`/v1/repos/${repoId}/versions/${versionId}/manifests/${manifestType}`);
	}

	/**
	 * Get a single markdown document for an Origami repository and version by type.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/repositories#get-v1-repos-(id)-versions-(id)-markdown-(type)}
	 * @param {String} repoId - The repository UUID or name. Warning: using name over ID incurs a redirect.
	 * @param {String} versionId - The version UUID or number. Warning: using number over ID incurs a redirect.
	 * @param {String} markdownType - The type of markdown document to retrieve. One of "designguidelines" or "readme".
	 * @returns {Promise<String>} A promise which resolves with the markdown document as a string.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Get a markdown document using UUIDs</caption>
	 * const readme = await repoData.getMarkdown('c3a499f8-3d20-503c-95b0-c4705bc272b3', 'a530dab8-f6ff-410a-9e56-8d6f49ecff2c', 'readme');
	 *
	 * @example <caption>Get a markdown document using a name and number</caption>
	 * const readme = await repoData.getMarkdown('origami-repo-data', '57.0.0', 'readme');
	 */
	getMarkdown(repoId, versionId, markdownType) {
		return this.get(`/v1/repos/${repoId}/versions/${versionId}/markdown/${markdownType}`);
	}

	/**
	 * Get the README text for an Origami repository and version. This is a shortcut method which uses {@link RepoDataClient.getMarkdown}.
	 * @param {String} repoId - The repository UUID or name. Warning: using name over ID incurs a redirect.
	 * @param {String} versionId - The version UUID or number. Warning: using number over ID incurs a redirect.
	 * @returns {Promise<String>} A promise which resolves with the README as a string.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Get the README using UUIDs</caption>
	 * const readme = await repoData.getReadme('c3a499f8-3d20-503c-95b0-c4705bc272b3', 'a530dab8-f6ff-410a-9e56-8d6f49ecff2c');
	 *
	 * @example <caption>Get the README using a name and number</caption>
	 * const readme = await repoData.getReadme('origami-repo-data', '57.0.0');
	 */
	getReadme(repoId, versionId) {
		return this.getMarkdown(repoId, versionId, 'readme');
	}

	/**
	 * Get a list of all demos for an Origami repository and version as an array.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/repositories#get-v1-repos-(id)-versions-(id)-demos}
	 * @param {String} repoId - The repository UUID or name. Warning: using name over ID incurs a redirect.
	 * @param {String} versionId - The version UUID or number. Warning: using number over ID incurs a redirect.
	 * @returns {Promise<String>} A promise which resolves with the demos.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Get all demos</caption>
	 * const demos = await repoData.listDemos('c3a499f8-3d20-503c-95b0-c4705bc272b3', 'a530dab8-f6ff-410a-9e56-8d6f49ecff2c');
	 */
	listDemos(repoId, versionId) {
		return this.get(`/v1/repos/${repoId}/versions/${versionId}/demos`);
	}

	/**
	 * Get a list of all image set images for an Origami repository and version as an array.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/repositories#get-v1-repos-(id)-versions-(id)-images}
	 * @param {String} repoId - The repository UUID or name. Warning: using name over ID incurs a redirect.
	 * @param {String} versionId - The version UUID or number. Warning: using number over ID incurs a redirect.
	 * @param {Object} [imageOptions] - Options which change the format of the returned images.
	 * @param {String} [imageOptions.sourceParam] - The Image Service source parameter to add to the returned image URLs.
	 * Defaults to "origami-repo-data-client-node".
	 * @returns {Promise<String>} A promise which resolves with the images.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Get all images in an image set</caption>
	 * const images = await repoData.listImages('c3a499f8-3d20-503c-95b0-c4705bc272b3', 'a530dab8-f6ff-410a-9e56-8d6f49ecff2c');
	 */
	listImages(repoId, versionId, imageOptions) {
		imageOptions = defaults({}, imageOptions, {
			sourceParam: 'origami-repo-data-client-node'
		});
		return this.get(`/v1/repos/${repoId}/versions/${versionId}/images`, {
			sourceParam: imageOptions.sourceParam
		});
	}

	/**
	 * Get a list of all dependencies for an Origami repository and version as an array.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/repositories#get-v1-repos-(id)-versions-(id)-dependencies}
	 * @param {String} repoId - The repository UUID or name. Warning: using name over ID incurs a redirect.
	 * @param {String} versionId - The version UUID or number. Warning: using number over ID incurs a redirect.
	 * @returns {Promise<String>} A promise which resolves with the dependencies.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Get all dependencies</caption>
	 * const dependencies = await repoData.listDependencies('c3a499f8-3d20-503c-95b0-c4705bc272b3', 'a530dab8-f6ff-410a-9e56-8d6f49ecff2c');
	 */
	listDependencies(repoId, versionId) {
		return this.get(`/v1/repos/${repoId}/versions/${versionId}/dependencies`);
	}

	/**
	 * Create a new API key which can be used to access the service (requires admin permissions).
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/keys#post-v1-keys}
	 * @param {Object} data - Information about the key being created.
	 * @param {String} data.description - A short human-readable description of the API key.
	 * @param {Boolean} [data.read=true] - Whether the API key grants read permissions.
	 * @param {Boolean} [data.write=false] - Whether the API key grants write permissions.
	 * @param {Boolean} [data.admin=false] - Whether the API key grants admin permissions.
	 * @returns {Promise<Object>} A promise which resolves with the new credentials.
	 * These will need to be stored somewhere, as the secret will never be displayed again.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Create an API key</caption>
	 * const credentials = await repoData.createKey({
	 *     description: 'A write key for manually adding ingestions',
	 *     read: true,
	 *     write: true,
	 *     admin: false
	 * });
	 */
	createKey(data) {
		return this.post('/v1/keys', data);
	}

	/**
	 * Get a list of all available API keys for the service as an array (requires admin permissions).
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/keys#get-v1-keys}
	 * @returns {Promise<Array>} A promise which resolves with the API keys.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>List API keys</caption>
	 * const repos = await repoData.listKeys();
	 */
	listKeys() {
		return this.get('/v1/keys');
	}

	/**
	 * Get a single API key for the service by ID.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/keys#get-v1-keys-(id)}
	 * @param {String} keyId - The key UUID.
	 * @returns {Promise<Object>} A promise which resolves with the API key.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Get an API key</caption>
	 * const key = await repoData.getKey('xxxXxXxX-XXXX-XXXX-xXXx-xxxXXXxXXXXX');
	 */
	getKey(keyId) {
		return this.get(`/v1/keys/${keyId}`);
	}

	/**
	 * Delete a single API key from the service by ID.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/keys#delete-v1-keys-(id)}
	 * @param {String} keyId - The key UUID.
	 * @returns {Promise<Object>} A promise which resolves when the key is deleted.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Delete an API key</caption>
	 * await repoData.deleteKey('xxxXxXxX-XXXX-XXXX-xXXx-xxxXXXxXXXXX');
	 */
	deleteKey(keyId) {
		return this.delete(`/v1/keys/${keyId}`);
	}

	/**
	 * Create a new ingestion and add it to the queue (requires write permissions).
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/queue#post-v1-queue}
	 * @param {Object} data - Information about the ingestion being created.
	 * @param {String} data.url - The GitHub repository URL to ingest.
	 * @param {String} data.tag - The GitHub repository tag to ingest.
	 * @returns {Promise<Object>} A promise which resolves with the new ingestion.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Create an ingestion</caption>
	 * const credentials = await repoData.createIngestion({
	 *     url: 'https://github.com/Financial-Times/origami-repo-data',
	 *     tag: '57.0.0'
	 * });
	 */
	createIngestion(data) {
		return this.post('/v1/queue', data);
	}

	/**
	 * Get a list of all current ingestions in the queue as an array.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/queue#get-v1-queue}
	 * @returns {Promise<Array>} A promise which resolves with the ingestion queue.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>List the ingestion queue</caption>
	 * const ingestionQueue = await repoData.listIngestions();
	 */
	listIngestions() {
		return this.get('/v1/queue');
	}

	/**
	 * Get a single ingestion in the queue by ID.
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/queue#get-v1-queue-(id)}
	 * @param {String} ingestionId - The ingestion UUID.
	 * @returns {Promise<Object>} A promise which resolves with the ingestion.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Get an ingestion</caption>
	 * const ingestion = await repoData.getIngestion('799798e6-967d-492e-8fee-f7f35ec39d44');
	 */
	getIngestion(ingestionId) {
		return this.get(`/v1/queue/${ingestionId}`);
	}

	/**
	 * Delete a single ingestion from the queue by ID, preventing that repo/tag combination from being ingested (requires admin permissions).
	 * @see {@link https://origami-repo-data.ft.com/v1/docs/api/queue#delete-v1-queue-(id)}
	 * @param {String} ingestionID - The ingestion UUID.
	 * @returns {Promise<Object>} A promise which resolves when the ingestion is deleted.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 *
	 * @example <caption>Delete an ingestion</caption>
	 * await repoData.deleteIngestion('799798e6-967d-492e-8fee-f7f35ec39d44');
	 */
	deleteIngestion(ingestionID) {
		return this.delete(`/v1/queue/${ingestionID}`);
	}

	/**
	 * Perform a GET request.
	 * @private
	 * @param {String} endpoint - The service endpoint to request. The service base URL will be prepended.
	 * @param {Object} [query] - Parameters to append to the URL, which will be serialized as a querystring.
	 * @returns {Promise} A promise which resolves with the response body.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 */
	get(endpoint, query) {
		return this.request('GET', endpoint, query);
	}

	/**
	 * Perform a POST request.
	 * @private
	 * @param {String} endpoint - The service endpoint to request. The service base URL will be prepended.
	 * @param {Object} data - The POST data to send, which will be serialized as JSON.
	 * @returns {Promise} A promise which resolves with the response body.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 */
	post(endpoint, data) {
		return this.request('POST', endpoint, undefined, data);
	}

	/**
	 * Perform a DELETE request.
	 * @private
	 * @param {String} endpoint - The service endpoint to request. The service base URL will be prepended.
	 * @returns {Promise} A promise which resolves with the response body.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 */
	delete(endpoint) {
		return this.request('DELETE', endpoint);
	}

	/**
	 * Perform an HTTP request.
	 * @private
	 * @param {String} method - The HTTP method to perform the request with.
	 * @param {String} endpoint - The service endpoint to request. The service base URL will be prepended.
	 * @param {Object} [query] - Parameters to append to the URL, which will be serialized as a querystring.
	 * @param {Object} [postData] - The data to send (if method is POST), which will be serialized as JSON.
	 * @returns {Promise} A promise which resolves with the response body.
	 * @throws {Error} Will throw if a network error occurs, or if the API responds with a 40x/50x status.
	 */
	async request(method, endpoint, query, postData) {
		const response = await request({
			method: method,
			uri: `${this.options.apiUrl}${endpoint}`,
			qs: query,
			headers: {
				'X-Api-Key': this.options.apiKey,
				'X-Api-Secret': this.options.apiSecret
			},
			body: postData,
			resolveWithFullResponse: true,
			simple: false,
			json: true
		});
		if (response.statusCode >= 400) {
			let error;
			if (response.body.validation) {
				error = new Error(`${response.body.message}: ${response.body.validation.join(', ')}`);
			} else {
				error = new Error(response.body.message);
			}
			error.status = response.statusCode;
			throw error;
		}
		return response.body || undefined;
	}

	/**
	 * Default the client options.
	 * @private
	 * @param {Object} [options] - The user options to be defaulted.
	 * @returns {Object} The defaulted options.
	 */
	static defaultOptions(options) {
		return defaults({}, options, {
			apiUrl: process.env.REPO_DATA_API_URL,
			apiKey: process.env.REPO_DATA_API_KEY,
			apiSecret: process.env.REPO_DATA_API_SECRET,
		}, {
			apiUrl: 'https://origami-repo-data.ft.com'
		});
	}

};

module.exports = RepoDataClient;
