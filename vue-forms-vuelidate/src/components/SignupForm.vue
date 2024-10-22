<template>
    <form @submit.prevent="handleSubmit">
        <label for="name">Name:</label>
        <input type="text" v-model="formData.name">
        <div class="error" v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</div>

        <label for="email">Email:</label>
        <input type="text" v-model="formData.email">
        <div class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</div>

        <label for="password">Password:</label>
        <input type="password" v-model="formData.password.password">
        <div class="error" v-if="v$.password.password.$error">{{ v$.password.password.$errors[0].$message }}</div>

        <label for="password">Confirm Password:</label>
        <input type="password" v-model="formData.password.confirmPassword">
        <div class="error" v-if="v$.password.confirmPassword.$error">{{ v$.password.confirmPassword.$errors[0].$message
            }}</div>


        <label for="role">Role:</label>
        <select v-model="formData.role">
            <option value="developer">Web Developer</option>
            <option value="designer">Web Designer</option>
        </select>

        <label for="skills">Skills:</label>
        <input type="text" v-model="formData.tempSkill" @keyup="addSkill">
        <div v-for="skill in formData.skills" class="pill" @click="deleteSkill(skill)">
            {{ skill }}
        </div>


        <div class="terms">
            <input type="checkbox" v-model="formData.terms">
            <label for="terms">Accept terms and conditions</label>
        </div>
        <div class="error" v-if="v$.terms.$error">{{ v$.terms.$errors[0].$message }}</div>

        <div class="submit">
            <button>Create an Account</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, helpers, minLength, required, sameAs } from '@vuelidate/validators';
import { computed, reactive } from 'vue';

const formData = reactive({
    name: "",
    email: "",
    password: {
        password: "",
        confirmPassword: ""
    },
    role: "designer",
    terms: false,
    tempSkill: "",
    skills: ["vuejs"]
});


// Validation rules with Vuelidate
const mustAcceptTerms = (value: boolean) => value;

const rules = computed(() => {
    return {
        name: { required },
        email: { required, email },
        password: {
            password: { required, minLength: minLength(6) },
            confirmPassword: {
                required,
                sameAs: helpers.withMessage("Passwords are not the same", sameAs(formData.password.password))
            }
        },
        terms: {
            // Custom validation rule
            validateTerm: helpers.withMessage(
                "You must accept the terms and conditions",
                mustAcceptTerms
            )
        },
    };
});

const v$ = useVuelidate(rules, formData);


// Methods
function addSkill(e: KeyboardEvent) {
    if (e.key === "," && formData.tempSkill.length > 1) {
        if (!formData.skills.includes(formData.tempSkill)) {
            formData.skills.unshift(formData.tempSkill.replace(",", ""))
        }
        formData.tempSkill = ""
    }
}

function deleteSkill(deleteSkill: string) {
    formData.skills = formData.skills.filter(skill => skill !== deleteSkill)
}

async function handleSubmit () {
    const isFormCorrect = await v$.value.$validate();
    if (isFormCorrect) {
        alert("Form submitted");
        console.log("Name:", formData.name);
        console.log("Email:", formData.email);
        console.log("Password:", formData.password.password);
        console.log("Confirm Password:", formData.password.confirmPassword);
        console.log("Role:", formData.role);
        console.log("Skills:", formData.skills);
        console.log("Terms accepted:", formData.terms);
    }
}

</script>

<style>
form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}

label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

input,
select {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}

input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
}

.pill {
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
}

.submit {
    text-align: center;
}

button {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
}

.error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
}
</style>