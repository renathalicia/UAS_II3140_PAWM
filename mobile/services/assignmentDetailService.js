import { getSupabase } from './supabase';

/**
 * Fetch assignment submission for a user
 */
export async function fetchUserSubmission(assignmentId, userId) {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase
      .from('assignment_submissions')
      .select('*')
      .eq('assignment_id', assignmentId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching submission:', error);
    throw error;
  }
}

/**
 * Upload file to Supabase Storage
 */
export async function uploadFile(file, assignmentId, userId) {
  const supabase = getSupabase();
  
  try {
    // Generate unique file path
    const timestamp = Date.now();
    // Sanitize filename - remove invalid characters
    const originalName = file.name || `file_${timestamp}`;
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `${timestamp}_${sanitizedName}`;
    const filePath = `assignments/${assignmentId}/${userId}/${fileName}`;

    // For React Native, we need to use fetch to create a blob from URI
    const response = await fetch(file.uri);
    const blob = await response.blob();

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('assignment-files')
      .upload(filePath, blob, {
        contentType: file.mimeType || 'application/octet-stream',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('assignment-files')
      .getPublicUrl(filePath);

    return {
      path: filePath,
      url: urlData.publicUrl,
      name: originalName,
      size: file.size,
      type: file.mimeType,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Submit or update assignment submission
 */
export async function submitAssignment(assignmentId, userId, fileData, textAnswer = null) {
  const supabase = getSupabase();

  try {
    // Check if submission already exists
    const existing = await fetchUserSubmission(assignmentId, userId);

    const submissionData = {
      assignment_id: assignmentId,
      user_id: userId,
      submission_file_url: fileData?.url || null,
      submission_file_name: fileData?.name || null,
      submission_text: textAnswer,
      submitted_at: new Date().toISOString(),
      // Don't set status - let database use default
    };

    let result;
    if (existing) {
      // Update existing submission
      const { data, error } = await supabase
        .from('assignment_submissions')
        .update(submissionData)
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new submission
      const { data, error } = await supabase
        .from('assignment_submissions')
        .insert([submissionData])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return result;
  } catch (error) {
    console.error('Error submitting assignment:', error);
    throw error;
  }
}

/**
 * Mark assignment as done
 */
export async function markAsDone(assignmentId, userId) {
  const supabase = getSupabase();

  try {
    const existing = await fetchUserSubmission(assignmentId, userId);

    if (existing) {
      // Don't update status, just return the existing submission
      return existing;
    } else {
      throw new Error('No submission found to mark as done');
    }
  } catch (error) {
    console.error('Error marking as done:', error);
    throw error;
  }
}

/**
 * Fetch class comments for an assignment
 */
export async function fetchClassComments(assignmentId) {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase
      .from('assignment_class_comments')
      .select(`
        id,
        assignment_id,
        user_id,
        comment,
        created_at,
        users:user_id (
          id,
          full_name
        )
      `)
      .eq('assignment_id', assignmentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching class comments:', error);
    throw error;
  }
}

/**
 * Fetch private comments for a user on an assignment
 */
export async function fetchPrivateComments(assignmentId, userId) {
  const supabase = getSupabase();

  try {
    // First get submission_id
    const submission = await fetchUserSubmission(assignmentId, userId);
    if (!submission) {
      return [];
    }

    const { data, error } = await supabase
      .from('assignment_private_comments')
      .select(`
        *,
        users:user_id (
          id,
          full_name
        )
      `)
      .eq('submission_id', submission.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching private comments:', error);
    throw error;
  }
}

/**
 * Add a comment (class or private)
 */
export async function addComment(assignmentId, userId, content, isPrivate = false) {
  const supabase = getSupabase();

  try {
    if (isPrivate) {
      // For private comments, need submission_id
      const submission = await fetchUserSubmission(assignmentId, userId);
      if (!submission) {
        throw new Error('Please submit your work first before adding private comments');
      }

      const { data, error } = await supabase
        .from('assignment_private_comments')
        .insert([{
          submission_id: submission.id,
          user_id: userId,
          comment: content,
          is_teacher: false,
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // For class comments
      const { data, error } = await supabase
        .from('assignment_class_comments')
        .insert([{
          assignment_id: assignmentId,
          user_id: userId,
          comment: content,
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}
