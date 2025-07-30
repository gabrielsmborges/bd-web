import { ROUTES, SAFE_ROUTES, UNSAFE_ROUTES } from '@/constants/routes'

export const MAP_ROUTE_TO_TITLE: Record<ROUTES, string> = {
  [SAFE_ROUTES.DASHBOARD]: 'Dashboard',
  [UNSAFE_ROUTES.SIGN_IN]: 'Sign In',
  [UNSAFE_ROUTES.SIGN_UP]: 'Sign Up',
  [SAFE_ROUTES.SELECT_ORGANIZATION]: 'Select Organization',
  [SAFE_ROUTES.EVENTS]: 'Events',
  [SAFE_ROUTES.ORDERS]: 'Orders',
  [SAFE_ROUTES.FINANCE]: 'Finance',
  [ROUTES.SETTINGS]: 'Settings'
}
