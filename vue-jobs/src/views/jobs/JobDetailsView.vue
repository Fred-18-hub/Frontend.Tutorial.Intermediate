<template>
    <div v-if="job">
        <h1>{{ job.title }}</h1>
        <!-- <p>The job id is {{ $route.params.id }}</p> -->
        <p>The job id is {{ props.id }}</p>
        <p>{{ job.details }}</p>
    </div>
    <div v-else>Loading job details...</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
    id: { type: String, required: true }
});
const job = ref<{ title: string, details: string } | null>(null);

onMounted(() => {
    fetch("http://localhost:3000/jobs/" + props.id)
        .then(response => response.json())
        .then(data => job.value = data)
        .catch(error => error.message)
});
</script>