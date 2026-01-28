<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-full">
      <div class="card">
        <div class="card-content">
          <div class="content">
            Communication tips here!
          </div>
        </div>
      </div>
    </div>

    <div class="column is-half">
      <div class="card">
        <div class="card-content">
          <p class="title">Talk about a Word</p>
          <p class="subtitle">Talk coherently about a word for a fixed amount of time</p>
          <div class="content">
            You will be presented with a randomly selected (probably English) word.
            Your task will be to talk coherently about the word until time runs out.
          </div>
        </div>
        <footer class="card-footer">
          <RouterLink to="/speech-words" class="card-footer-item">Start Practice</RouterLink>
        </footer>
      </div>
    </div>
  </div>
</template>
