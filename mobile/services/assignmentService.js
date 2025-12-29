import { getSupabase } from './supabase';

/**
 * Fetch all assignments
 * @returns {Promise<Array>} Array of assignment objects
 */
export async function fetchUserAssignments() {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('*');

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw error;
  }
}

/**
 * Fetch a single assignment by ID
 * @param {string} assignmentId - The assignment ID
 * @returns {Promise<Object>} Assignment object
 */
export async function fetchAssignmentById(assignmentId) {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('id', assignmentId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching assignment:', error);
    throw error;
  }
}

/**
 * Update assignment status
 * @param {string} assignmentId - The assignment ID
 * @param {string} status - New status ('submitted', 'unsubmitted')
 * @returns {Promise<Object>} Updated assignment
 */
export async function updateAssignmentStatus(assignmentId, status) {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase
      .from('assignments')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', assignmentId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error updating assignment status:', error);
    throw error;
  }
}
