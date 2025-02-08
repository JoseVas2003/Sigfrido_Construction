'use client';

import {SessionProvider} from 'next-auth/react';

export const ClientSessions = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>;
};