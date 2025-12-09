import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, CardEntity } from './session';

export default async function getSession() {
    const cookieStore = await cookies();
    const session = await getIronSession<CardEntity>(cookieStore, sessionOptions);
    return await session
}

