const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default defineNuxtRouteMiddleware(to => {
  const { userId } = useAuth()

  if (!userId.value && isProtectedRoute(to)) {
    return navigateTo('/sign-in')
  }
})
