import { withAuth } from 'next-auth/middleware';

export default withAuth({
    
    pages: {
        signIn: "/login",
        error: "/",
    },
    callbacks:{
        authorized:({token, req}) => {
            if(req.nextUrl.pathname == '/adminDashboard'){
                if(token?.admin == true)
                {
                    return true;
                }else{
                    return false;
                }
            } 
        }
    }
})

export const config = {matcher: ['/clientDashboard', '/adminDashboard',
                                 '/schedule', '/clientSettingsPage'
]};