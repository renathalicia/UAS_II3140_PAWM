import { getSupabase } from './supabase';

/**
 * Fetch all assignments with user submission status
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of assignment objects with submission status
 */
export async function fetchUserAssignments(userId) {
  const supabase = getSupabase();

  try {
    // Fetch assignments
    const { data: assignments, error: assignmentError } = await supabase
      .from('assignments')
      .select('*')
      .order('due_date', { ascending: true });

    if (assignmentError) throw assignmentError;

    // Fetch user submissions
    const { data: submissions, error: submissionError } = await supabase
      .from('assignment_submissions')
      .select('assignment_id, id, submitted_at')
      .eq('user_id', userId);

    if (submissionError) throw submissionError;

    // Create a map of submission status by assignment_id
    const submissionMap = {};
    (submissions || []).forEach(sub => {
      submissionMap[sub.assignment_id] = {
        hasSubmission: true,
        submittedAt: sub.submitted_at,
      };
    });

    // Merge submission status into assignments
    const enrichedAssignments = (assignments || []).map(assignment => ({
      ...assignment,
      hasSubmission: submissionMap[assignment.id]?.hasSubmission || false,
      submittedAt: submissionMap[assignment.id]?.submittedAt || null,
      // Add display status
      displayStatus: submissionMap[assignment.id]?.hasSubmission ? 'submitted' : 'not submitted',
    }));

    return enrichedAssignments;
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
