<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Discover the Latest AI Tools</h1>
      <p class="text-lg text-gray-600 mb-8">Explore our curated collection of cutting-edge AI tools and stay ahead in the AI revolution.</p>
      <button 
        @click="callApi"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
      Call API
      </button>
    </div>

    <!-- Featured Tools Section -->
    <div class="mb-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Featured Tools</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="tool in featuredTools" :key="tool.id" class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-gray-900">{{ tool.name }}</h3>
              <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getCategoryClass(tool.category)">
                {{ tool.category }}
              </span>
            </div>
            <p class="text-gray-600 mb-4">{{ tool.description }}</p>
            <a 
              :href="tool.url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-indigo-600 hover:text-indigo-500 font-medium flex items-center"
            >
              Try it out
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- All Tools Section -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">All Tools</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="tool in tools" :key="tool.id" class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-2">{{ tool.name }}</h3>
          <p class="text-sm text-gray-500 mb-3">{{ tool.description }}</p>
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getCategoryClass(tool.category)">
              {{ tool.category }}
            </span>
            <a 
              :href="tool.url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Learn more →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const { $auth0 } = useNuxtApp()


const featuredTools = ref([
  {
    id: 1,
    name: 'ChatGPT',
    description: 'Revolutionary AI chatbot that can engage in human-like conversations, assist with tasks, and generate creative content.',
    category: 'Text',
    url: 'https://chat.openai.com'
  },
  {
    id: 2,
    name: 'DALL-E 3',
    description: 'Advanced AI image generation system that creates stunning, photorealistic images from text descriptions.',
    category: 'Image',
    url: 'https://openai.com/dall-e-3'
  },
  {
    id: 3,
    name: 'Claude',
    description: 'An AI assistant focused on safety and helpful interactions, capable of complex analysis and coding.',
    category: 'Text',
    url: 'https://anthropic.com/claude'
  }
])

const tools = [
  {
    id: 4,
    name: 'Midjourney',
    description: 'AI art generator creating beautiful and unique images from text prompts.',
    category: 'Image',
    url: 'https://www.midjourney.com'
  },
  {
    id: 5,
    name: 'Whisper',
    description: 'Advanced speech recognition system for accurate transcription and translation.',
    category: 'Audio',
    url: 'https://openai.com/research/whisper'
  },
  {
    id: 6,
    name: 'Stable Diffusion',
    description: 'Open-source image generation model for creating diverse artistic images.',
    category: 'Image',
    url: 'https://stability.ai'
  },
  {
    id: 7,
    name: 'Synthesia',
    description: 'Create AI-powered videos with virtual presenters and custom scripts.',
    category: 'Video',
    url: 'https://www.synthesia.io'
  },
  {
    id: 8,
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write better code faster.',
    category: 'Code',
    url: 'https://github.com/features/copilot'
  },
  {
    id: 9,
    name: 'Eleven Labs',
    description: 'AI voice generation and cloning for natural-sounding speech.',
    category: 'Audio',
    url: 'https://elevenlabs.io'
  }
]

const getCategoryClass = (category) => {
  const classes = {
    'Text': 'bg-blue-100 text-blue-800',
    'Image': 'bg-purple-100 text-purple-800',
    'Audio': 'bg-green-100 text-green-800',
    'Video': 'bg-red-100 text-red-800',
    'Code': 'bg-gray-100 text-gray-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}

const apiurl = "https://dwain-unfinished-api.azure-api.net/api/tools/list"
//const apiurl = "https://dwain-unfinished-api.azure-api.net/dwain-unfinished-api/DummyData"

const callApi = async () => {
  try {
    const token = await $auth0.getToken() // Retrieve the token securely
    const response = await fetch(apiurl, {
      headers: {
        'x-dwain-unfinished': 'fb6c4ce56a8d4af7ac24f46ce5eeebc2',
        'Authorization': `Bearer ${token}`, // Use the retrieved token
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Results", data);

      // Assuming featuredTools is a reactive ref or variable
      featuredTools.value = data;
    } else {
      console.error("API returned error:", response.status);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

</script>

