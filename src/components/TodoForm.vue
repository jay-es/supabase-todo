<script setup lang="ts">
import { addTodo } from "@/lib/supabase";
import { ref } from "vue";

const task = ref("");

const handleClick = async () => {
  await addTodo({
    user_id: import.meta.env.VITE_SUPABASE_USER_ID as string,
    task: task.value,
  });

  task.value = "";
};
</script>

<template>
  <input v-model="task" placeholder="What needs to be done?" />
  <button :disabled="task.length <= 3" @click="handleClick">Add</button>
</template>
