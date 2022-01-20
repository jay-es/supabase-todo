<script setup lang="ts">
import { addTodo } from "@/lib/supabase";
import { ref } from "vue";

const task = ref("");

const handleClick = async () => {
  await addTodo(task.value);

  task.value = "";
};
</script>

<template>
  <input v-model="task" placeholder="What needs to be done?" />
  <button :disabled="task.length <= 3" @click="handleClick">Add</button>
</template>
