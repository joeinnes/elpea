import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';
const { VITE_HOST } = import.meta.env;

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	if (!cookies) {
		return await resolve(request);
	}
	let access_token = '';
	if (cookies?.spotify_access_token) {
		access_token = cookies.spotify_access_token;
	} else if (cookies.spotify_refresh_token && !cookies.spotify_access_token) {
		const spotify_request = await fetch(
			`${VITE_HOST}/api/auth/refresh?code=${cookies.spotify_refresh_token}`
		);
		const spotify_response = await spotify_request.json();
		if (spotify_response.spotify_access_token) {
			access_token = spotify_response.spotify_access_token;
		} else {
			return await resolve(request);
		}
	} else {
		return await resolve(request);
	}

	const req = await fetch(`https://api.spotify.com/v1/me`, {
		headers: { Authorization: `Bearer ${access_token}` }
	});

	const res = await req.json();
	if (res.id) {
		request.locals.user = {
			...res,
			access_token,
			refresh_token: cookies?.spotify_refresh_token
		}
	}

	const response = await resolve(request);

	return response;
}
export const getSession: GetSession = async (req) => {
	return req.locals
}
