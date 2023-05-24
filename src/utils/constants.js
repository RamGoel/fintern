export const appName = 'Finda';
export const accountArray = [
    {
        name: 'Profile',
        path: (id) => {
            return `/candidate/${id}/profile`
        },
    },
    {
        name: 'Edit Profile',
        path: (id) => {
            return `/candidate/${id}/edit-profile`
        },
    },
    {
        name: 'Settings',
        path: (id) => {
            return `/candidate/${id}/settings`
        },
    },
    {
        name: 'About us',
        isExternal: true,
        path: (id) => {
            return `https://ramgoel.me`
        },
    },
    {
        name: 'Contact',
        isExternal: true,
        path: (id) => {
            return `mailto:rgoel766@gmail.com`
        },
    },
]
export const bgColor="#2C3333"
export const divColor='#2E4F4F'
export const btnColor="#0E8388"
export const textLight="#CBE4DE"
