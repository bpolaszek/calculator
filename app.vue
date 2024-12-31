<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <NuxtPage />
    <ClientOnly>
      <ReloadPrompt />
    </ClientOnly>
  </div>
</template>