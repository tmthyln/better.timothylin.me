<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-half">
      <div class="card">
        <div class="card-content">
          <p class="title">Welcome</p>
          <p class="subtitle">Get started with Better</p>
          <div class="content">
            Practice and improve your speech with timed word exercises.
          </div>
        </div>
      </div>
    </div>

    <div class="column is-half">
      <div class="card">
        <div class="card-content">
          <p class="title">Speech Words</p>
          <p class="subtitle">Practice speaking</p>
          <div class="content">
            Read random words aloud and track your timing.
          </div>
        </div>
        <footer class="card-footer">
          <RouterLink to="/speech-words" class="card-footer-item">Start Practice</RouterLink>
        </footer>
      </div>
    </div>
  </div>
</template>
