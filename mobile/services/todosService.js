import { getSupabase } from './supabase';

/**
 * Fetch all todos for a user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of todo objects
 */
export async function fetchUserTodos(userId) {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('position', { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

/**
 * Create a new todo
 * @param {string} userId - The user ID
 * @param {string} text - Todo text
 * @param {string|null} deadline - Optional deadline
 * @param {number} position - Position in list
 * @returns {Promise<Object>} Created todo
 */
export async function createTodo(userId, text, deadline = null, position = 0) {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          user_id: userId,
          text,
          deadline,
          checked: false,
          position,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}

/**
 * Update todo
 * @param {string} todoId - The todo ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated todo
 */
export async function updateTodo(todoId, updates) {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase
      .from('todos')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', todoId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

/**
 * Delete todo
 * @param {string} todoId - The todo ID
 * @returns {Promise<void>}
 */
export async function deleteTodo(todoId) {
  const supabase = getSupabase();

  try {
    const { error } = await supabase.from('todos').delete().eq('id', todoId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}

/**
 * Reorder todos
 * @param {Array} todos - Array of todos with updated positions
 * @returns {Promise<void>}
 */
export async function reorderTodos(todos) {
  const supabase = getSupabase();

  try {
    const updates = todos.map((todo, index) => ({
      id: todo.id,
      position: index,
      updated_at: new Date().toISOString(),
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from('todos')
        .update({ position: update.position, updated_at: update.updated_at })
        .eq('id', update.id);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error reordering todos:', error);
    throw error;
  }
}