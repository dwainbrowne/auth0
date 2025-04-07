<template>
  <div>
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-800">AI Tools Tracker</h1>
            </NuxtLink>
          </div>
          <div class="flex items-center">
            <template v-if="isLoggedIn">
              <NuxtLink to="/dashboard" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </NuxtLink>
              <button @click="handleLogout" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Logout
              </button>
            </template>
            <template v-else>
              <button @click="handleLogin" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </button>
              <NuxtLink to="/register" class="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                Register
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
const isLoggedIn = useState('isLoggedIn', () => false)

const router = useRouter()
const { $auth0 } = useNuxtApp()

// Check login status on component initialization
onMounted(async () => {
  try {
    const token = await $auth0.getToken() // Use the correct method to retrieve the token
    isLoggedIn.value = !!token // Set isLoggedIn to true if a token is retrieved
  } catch (error) {
    console.error("Error checking authentication status:", error)
    isLoggedIn.value = false // Ensure isLoggedIn is false if an error occurs
  }
})

const handleLogout = () => {
  $auth0.logout()
  isLoggedIn.value = false
  router.push('/')
}

const handleLogin = async () => {
  console.log("Logging in...")
  await $auth0.login()
  isLoggedIn.value = true
}
</script>