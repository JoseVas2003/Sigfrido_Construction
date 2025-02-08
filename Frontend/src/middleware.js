export {default} from 'next-auth/middleware';

export const config = {matcher: ['/clientDashboard', '/adminDashboard', '/resetPassword',
                                 '/schedule', '/clientSettingsPage'
]};