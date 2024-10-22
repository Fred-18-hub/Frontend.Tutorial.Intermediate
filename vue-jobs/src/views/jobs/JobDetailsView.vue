<template>
    <div class="job-details" v-if="job">
        <h3>Job Tile</h3>
        <p>{{ job.title }}</p>
        <h3>Job Id</h3>
        <p>{{ props.id }}</p>
        <h3>Job Details</h3>
        <p>{{ job.details }}</p>
    </div>
    <div v-else>Loading job details...</div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const props = defineProps({
    id: { type: String, required: true }
});
const job = ref<{ title: string, details: string } | null>(null);

watchEffect(() => {
    fetch("http://localhost:3000/jobs/" + props.id)
        .then(response => response.json())
        .then(data => job.value = data)
        .catch(error => error.message)
});

// Navigation Guard
onBeforeRouteUpdate((to, from) => {
    job.value = null;
    console.log("before route update");
    
});
</script>

<style>
.job-details {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 20px auto;
    max-width: 600px;
}
</style>