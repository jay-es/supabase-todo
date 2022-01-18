<script setup lang="ts">
import { updateTaskCompletion } from "@/lib/supabase";
import { computed } from "vue";

const props = defineProps<{ todo: Todo }>();

const time = computed(() => {
  const date = new Date(props.todo.inserted_at ?? "");
  return date.toLocaleString();
});

const handleChange = (ev: Event) => {
  const target = ev.target as HTMLInputElement;
  updateTaskCompletion(props.todo, target.checked);
};
</script>

<template>
  <input type="checkbox" :checked="todo.is_complete" @change="handleChange" />
  <span :class="{ 'is-complete': todo.is_complete }">
    {{ todo.id }} {{ time }} - {{ todo.task }}
  </span>
</template>

<style>
.is-complete {
  text-decoration: line-through;
}
</style>
