<template>
  <div class="has-text-centered">
    <p class="subtitle mb-3">Talk about this for {{ initialMinutes }} minute{{ initialMinutes === 1 ? '' : 's' }} and {{ initialSeconds }} second{{ initialSeconds === 1 ? '' : 's' }}</p>

    <div class="mb-5 is-flex is-justify-content-center is-align-items-center">
      <h1 class="title is-1 mb-0 mr-3">{{ currentWord }}</h1>
      <button class="button is-danger is-light" @click="deleteWord" title="Delete word">
        <span>&#128465;</span>
      </button>
    </div>

    <div class="mb-5 timer-container">
      <svg class="progress-ring" viewBox="0 0 200 200">
        <circle
          class="progress-ring-bg"
          cx="100"
          cy="100"
          r="90"
        />
        <circle
          class="progress-ring-circle"
          cx="100"
          cy="100"
          r="90"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
        />
      </svg>
      <div class="timer-inputs">
        <input
          class="input timer-input is-large has-text-centered is-family-monospace"
          type="number"
          v-model.number="minutes"
          min="0"
          max="99"
          :disabled="isRunning"
        />
        <span class="title is-2 is-family-monospace mx-2">:</span>
        <input
          class="input timer-input is-large has-text-centered is-family-monospace"
          type="text"
          :value="secondsDisplay"
          @input="onSecondsInput"
          @blur="normalizeSeconds"
          :disabled="isRunning"
        />
      </div>
    </div>

    <div class="buttons is-centered">
      <button
        class="button"
        :class="isRunning ? 'is-warning' : 'is-success'"
        @click="toggle"
        :disabled="!isRunning && totalSeconds === 0"
      >
        {{ isRunning ? 'Stop' : 'Start' }}
      </button>
      <button class="button is-light" @click="reset">Reset</button>
      <button class="button is-info" @click="fetchRandomWord">New Word</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFetch, useIntervalFn } from '@vueuse/core'

const { data: wordData, execute } = useFetch('/api/random-word', { immediate: true }).json<{ word: string }>()
const currentWord = computed(() => wordData.value?.word ?? '')

function fetchRandomWord() {
  execute()
}

async function deleteWord() {
  if (!currentWord.value) return
  await fetch(`/api/word/${encodeURIComponent(currentWord.value)}`, { method: 'DELETE' })
  fetchRandomWord()
}

const DEFAULT_MINUTES = 2
const DEFAULT_SECONDS = 0

const minutes = ref(DEFAULT_MINUTES)
const seconds = ref(DEFAULT_SECONDS)
const initialMinutes = ref(DEFAULT_MINUTES)
const initialSeconds = ref(DEFAULT_SECONDS)

const secondsDisplay = computed(() => seconds.value.toString().padStart(2, '0'))

function onSecondsInput(e: Event) {
  const value = parseInt((e.target as HTMLInputElement).value) || 0
  seconds.value = Math.max(0, value)
}

function normalizeSeconds() {
  if (seconds.value > 59) {
    const extraMinutes = Math.floor(seconds.value / 60)
    minutes.value += extraMinutes
    seconds.value = seconds.value % 60
  }
}

const totalSeconds = computed(() => minutes.value * 60 + seconds.value)
const initialTotalSeconds = computed(() => initialMinutes.value * 60 + initialSeconds.value)

const circumference = 2 * Math.PI * 90
const strokeDashoffset = computed(() => {
  if (initialTotalSeconds.value === 0) return circumference
  const progress = totalSeconds.value / initialTotalSeconds.value
  return circumference * (1 - progress)
})

const { isActive: isRunning, pause, resume } = useIntervalFn(() => {
  if (seconds.value > 0) {
    seconds.value--
  } else if (minutes.value > 0) {
    minutes.value--
    seconds.value = 59
  }
}, 1000, { immediate: false })

watch(totalSeconds, async (value) => {
  if (value === 0 && isRunning.value) {
    pause()
    if (currentWord.value) {
      await fetch(`/api/word/${encodeURIComponent(currentWord.value)}`, { method: 'POST' })
    }
  }
})

function toggle() {
  if (isRunning.value) {
    pause()
  } else if (totalSeconds.value > 0) {
    initialMinutes.value = minutes.value
    initialSeconds.value = seconds.value
    resume()
  }
}

function reset() {
  pause()
  minutes.value = initialMinutes.value
  seconds.value = initialSeconds.value
}
</script>

<style scoped>
.timer-container {
  position: relative;
  width: 250px;
  height: 250px;
  margin: 0 auto;
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-ring-bg {
  fill: none;
  stroke: #e0e0e0;
  stroke-width: 8;
}

.progress-ring-circle {
  fill: none;
  stroke: #48c78e;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
}

.timer-inputs {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
}

.timer-input {
  width: 4rem;
}

.timer-input::-webkit-inner-spin-button,
.timer-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.timer-input {
  -moz-appearance: textfield;
}
</style>
