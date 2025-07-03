export enum UNSAFE_ROUTES {
    SIGN_IN = 'sign-in',
    SIGN_UP = 'sign-up',
}

export enum SAFE_ROUTES {
    DASHBOARD = '/dashboard',
    SELECT_ORGANIZATION = '/select-org',
    EVENTS = '/events',
    ORDERS = '/orders',
    FINANCE = '/finance'
}

export enum ROUTES {
    // UNSAFE
    SIGN_IN = UNSAFE_ROUTES.SIGN_IN,
    SIGN_UP = UNSAFE_ROUTES.SIGN_UP,

    // SAFE
    DASHBOARD = SAFE_ROUTES.DASHBOARD,
    SELECT_ORGANIZATION = SAFE_ROUTES.SELECT_ORGANIZATION,
    EVENTS = SAFE_ROUTES.EVENTS,
    ORDERS = SAFE_ROUTES.ORDERS,
    FINANCE = SAFE_ROUTES.FINANCE,

    // SETTINGS
    SETTINGS = '/settings'
}