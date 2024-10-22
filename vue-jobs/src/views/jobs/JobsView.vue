<template>
    <h1>Jobs</h1>
    <div v-if="jobs.length">
        <div v-for="job in jobs" :key="job.id" class="job">
            <RouterLink :to="{ name: 'jobDetails', params: { id: job.id } }">
                <h2>{{ job.title }}</h2>
            </RouterLink>
        </div>
        <RouterView />
    </div>
    <div v-else>Loading jobs...</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const jobs = ref<{ id: string, title: string }[]>([]);

onMounted(() => {
    fetch("http://localhost:3000/jobs")
        .then(response => response.json())
        .then(data => jobs.value = data)
        .catch(error => error.message);
});

// Navigation Guard
onBeforeRouteLeave((to, from) => {
    jobs.value = [];
    console.log("before route leave");
});
</script>

<style>
.job h2 {
    background: #f4f4f4;
    color: #444;
    border-radius: 10px;
    margin: 10px auto;
    max-width: 600px;
    padding: 20px;
    cursor: pointer;
}

.job h2:hover {
    background: #ddd;
}

.job a {
    text-decoration: none;
}
</style>