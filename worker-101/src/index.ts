/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return handleRequest(request)
	},
};
const cache: cacheKVType = {};

async function handleRequest(request: Request): Promise<Response> {
	let resp;
	let { pathname } = new URL(request.url);
	pathname = pathname.toLowerCase().replace("/", "");
	if (!!pathname) {
		resp = await filteredResults_handle(pathname);
	}
	else {
		let res = await getAllUsers();
		resp = new Response(JSON.stringify(res), {
			headers:
			{
				"Content-Type": "application/json"
			}
		});
	}
	return resp;
}

async function getAllUsers(): Promise<jsonPlaceholderUserType[]> {
	let cachedResults = (getFromCache('all') as jsonPlaceholderUserType[]);
	if (!!cachedResults)
		return cachedResults;
	let results: jsonPlaceholderUserType[] = await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
	results.forEach(el => el.date = new Date());
	addToCache('all', results);
	return results;
}

async function filteredResults_handle(pathname: string) {
	let cachedResults = getFromCache(pathname);
	if (!!cachedResults) {
		return new Response(JSON.stringify(cachedResults), {
			headers:
			{
				"Content-Type": "application/json"
			}
		});;
	}

	if (!isNaN(parseInt(pathname))) {
		let res: jsonPlaceholderUserType = await fetch(`https://jsonplaceholder.typicode.com/users/${pathname}`).then(res => res.json());
		res.date = new Date();
		addToCache(pathname, res);
		return new Response(JSON.stringify(res), {
			headers:
			{
				"Content-Type": "application/json"
			}
		});
	}
	else {
		let res = await getAllUsers();
		let filteredRes = res.filter(el =>
			el.name.toLowerCase().includes(pathname)
			||
			el.username.toLowerCase().includes(pathname)
			||
			el.email.toLowerCase().includes(pathname)
			||
			el.website.toLowerCase().includes(pathname)
		);
		addToCache(pathname, filteredRes);
		return new Response(JSON.stringify(filteredRes), {
			headers:
			{
				"Content-Type": "application/json"
			}
		});
	}
}

function getFromCache(key: string): (jsonPlaceholderUserType[] | jsonPlaceholderUserType | null) {
	if (cache[key] && cache[key].expiry > new Date())
		return cache[key].results;
	return null;
}

function addToCache(key: string, data: jsonPlaceholderUserType | jsonPlaceholderUserType[]) {
	cache[key] = { results: data, expiry: new Date(new Date().setMinutes(new Date().getMinutes() + 3)) };
}

type jsonPlaceholderUserType = {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
	date: Date | undefined;
}

type cacheKVType = {
	[key: string]: cacheValueType
}

type cacheValueType = {
	results: jsonPlaceholderUserType[] | jsonPlaceholderUserType;
	expiry: Date;
}