<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">My AI Tools Collection</h1>
    </div>
    
    <!-- Add New Tool Form -->
    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Add New AI Tool</h2>
      <form @submit.prevent="addTool" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Tool Name</label>
          <input
            type="text"
            id="name"
            v-model="newTool.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="newTool.description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            v-model="newTool.category"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="text">Text Generation</option>
            <option value="image">Image Generation</option>
            <option value="audio">Audio Processing</option>
            <option value="video">Video Creation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label for="url" class="block text-sm font-medium text-gray-700">Website URL</label>
          <input
            type="url"
            id="url"
            v-model="newTool.url"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Tool
        </button>
      </form>
    </div>

    <!-- Tools List -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">My Tools</h2>
      <div v-if="tools.length === 0" class="text-center text-gray-500 py-4">
        No tools added yet. Start by adding your first AI tool above!
      </div>
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="tool in tools" :key="tool.id" class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900">{{ tool.name }}</h3>
          <p class="mt-1 text-sm text-gray-500">{{ tool.description }}</p>
          <div class="mt-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {{ tool.category }}
            </span>
          </div>
          <a
            :href="tool.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-3 text-sm text-indigo-600 hover:text-indigo-500 block"
          >
            Visit Website →
          </a>
          <button
            @click="deleteTool(tool.id)"
            class="mt-2 text-sm text-red-600 hover:text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tools = useState('tools', () => [
  {
    id: 1,
    name: 'ChatGPT',
    description: 'Advanced language model for text generation and conversation',
    category: 'text',
    url: 'https://chat.openai.com'
  },
  {
    id: 2,
    name: 'DALL-E',
    description: 'AI system that creates realistic images and art from natural language descriptions',
    category: 'image',
    url: 'https://openai.com/dall-e-2'
  },
  {
    id: 3,
    name: 'Midjourney',
    description: 'AI-powered tool that generates images from textual descriptions',
    category: 'image',
    url: 'https://www.midjourney.com'
  }
])

const newTool = ref({
  name: '',
  description: '',
  category: 'text',
  url: ''
})

const addTool = () => {
  const tool = {
    id: Date.now(),
    ...newTool.value
  }
  tools.value.unshift(tool)
  
  // Reset form
  newTool.value = {
    name: '',
    description: '',
    category: 'text',
    url: ''
  }
}

const deleteTool = (id) => {
  if (!confirm('Are you sure you want to delete this tool?')) return
  tools.value = tools.value.filter(tool => tool.id !== id)
}
</script>