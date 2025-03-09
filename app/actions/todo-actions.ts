"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "app/utils/supabase/server";

export type TodoRow = Database["public"]["Tables"]["Todo_hgw"]["Row"];
export type TodoRowInsert = Database["public"]["Tables"]["Todo_hgw"]["Insert"];
export type TodoRowUpdate = Database["public"]["Tables"]["Todo_hgw"]["Update"];

function handleError(error) {
  console.error(error);
  throw new Error(error.message);
}

// 조회
export async function getTodos({ searchInput = "" }): Promise<TodoRow[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("Todo_hgw")
    .select("*")
    .like("title", `%${searchInput}%`)
    .order("createdAt", { ascending: true });

  if (error) {
    handleError(error);
  }

  return data;
}

// 생성
export async function createTodo(todo: TodoRowInsert) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("Todo_hgw")
    .insert({
      ...todo,
      createdAt: new Date().toISOString(),
    });

  if (error) {
    handleError(error);
  }

  return data;
}

// 수정
export async function updateTodo(todo: TodoRowUpdate) {
  const supabase = await createServerSupabaseClient();
  console.log('수정 todo', todo);

  const { data, error } = await supabase
    .from("Todo_hgw")
    .update({
      ...todo,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", todo.id);

  if (error) {
    handleError(error);
  }

  return data;
}

// 삭제
export async function deleteTodo(id: number) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("Todo_hgw")
    .delete()
    .eq("id", id);

  if (error) {
    handleError(error);
  }

  return data;
}
