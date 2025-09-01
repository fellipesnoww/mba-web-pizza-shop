import { http, HttpResponse } from "msw";
import type { SignInBody } from "../sign-in";

export const signInMock = http.post<never, SignInBody>("/authenticate", async ({request}) => {
    const { email } = await request.json();
    if (email === "test@email.com") {
        return new HttpResponse(null, {
            headers: {'Set-Cookie': 'auth=sample-jwt'}
        });
    }
    return new HttpResponse(null, { status: 401 });
})