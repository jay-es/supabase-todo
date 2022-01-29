import { createClient } from "@supabase/supabase-js";
import { ref } from "vue";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabaseUserId = import.meta.env.VITE_SUPABASE_USER_ID as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signIn = async () => {
  await new Promise((r) => setTimeout(r, 250));

  if (!supabase.auth.user()) {
    await supabase.auth.signIn({ provider: "github" });
    return;
  }

  fetchTodos();

  supabase.from("todos").on("*", fetchTodos).subscribe();
};

const allTodos = ref<Todo[]>([]);

/**
 * Retrieve all todo for the signed in user
 */
async function fetchTodos() {
  try {
    const { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .order("id");

    if (error) {
      console.log("error", error);
      return;
    }
    // handle for when no todos are returned
    if (todos === null) {
      allTodos.value = [];
      return;
    }
    // store response to allTodos
    allTodos.value = todos;
    console.log("got todos!", allTodos.value);
  } catch (err) {
    console.error("Error retrieving data from db", err);
  }
}

/**
 *  Add a new todo to supabase
 */
async function addTodo(task: string): Promise<null | Todo> {
  try {
    const todo: Todo = {
      task,
      user_id: supabaseUserId,
    };
    const { data, error } = await supabase.from("todos").insert(todo).single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    console.log("created a new todo");
    return data;
  } catch (err) {
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
async function updateTaskCompletion(todo: Todo, isCompleted: boolean) {
  try {
    const { error } = await supabase
      .from("todos")
      .update({ is_complete: isCompleted })
      .eq("id", todo.id)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error updating", error);
      return;
    }

    console.log("Updated task", todo.id);
  } catch (err) {
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

/**
 *  Deletes a todo via its id
 */
async function deleteTodo(todo: Todo) {
  try {
    await supabase.from("todos").delete().eq("id", todo.id);
    console.log("deleted todo", todo.id);
  } catch (error) {
    console.error("error", error);
  }
}

export { allTodos, fetchTodos, addTodo, updateTaskCompletion, deleteTodo };
