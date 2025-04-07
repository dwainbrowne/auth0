export default defineNuxtRouteMiddleware((to) => {
  const isLoggedIn = useState('isLoggedIn')

  if (!isLoggedIn.value && to.path === '/dashboard') {
    return navigateTo('/login')
  }
})