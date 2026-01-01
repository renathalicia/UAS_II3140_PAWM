import { getSupabase } from './supabase';

/**
 * Fetch all practice sections with nodes and user progress
 */
export async function fetchPracticeSections(userId) {
  const supabase = getSupabase();

  try {
    // Get all sections with their nodes
    const { data: sections, error: sectionsError } = await supabase
      .from('practice_sections')
      .select(`
        *,
        practice_nodes (*)
      `)
      .order('order_index', { ascending: true });

    if (sectionsError) throw sectionsError;

    // Get user's completed nodes
    const { data: completedNodes, error: completedError } = await supabase
      .from('completed_nodes')
      .select('node_id, section_id')
      .eq('user_id', userId);

    if (completedError) throw completedError;

    // Create a map of completed nodes
    const completedMap = {};
    (completedNodes || []).forEach(node => {
      completedMap[`${node.section_id}_${node.node_id}`] = true;
    });

    // Build structured data grouped by unit_number
    const grouped = {};
    (sections || []).forEach(section => {
      const unitKey = `Unit ${section.unit_number}`;
      
      if (!grouped[unitKey]) {
        grouped[unitKey] = [];
      }

      // Check if all nodes in this section are completed
      const nodes = section.practice_nodes || [];
      const allNodesCompleted = nodes.length > 0 && nodes.every(node => 
        completedMap[`${section.id}_${node.id}`]
      );

      grouped[unitKey].push({
        id: section.id,
        title: section.title,
        unitNumber: section.unit_number,
        sectionNumber: section.section_number,
        description: section.description,
        color: section.color,
        nodes: nodes.map(node => ({
          ...node,
          isCompleted: completedMap[`${section.id}_${node.id}`] || false,
        })),
        isCompleted: allNodesCompleted,
      });
    });

    // Convert to array format
    const result = Object.keys(grouped).sort().map(unitKey => ({
      unit: unitKey,
      sections: grouped[unitKey],
    }));

    return result;
  } catch (error) {
    console.error('Error fetching practice sections:', error);
    throw error;
  }
}

/**
 * Fetch questions for a specific node
 */
export async function fetchPracticeQuestions(nodeId) {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase
      .from('practice_questions')
      .select('*')
      .eq('node_id', nodeId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching practice questions:', error);
    throw error;
  }
}

/**
 * Submit node completion
 */
export async function submitNodeCompletion(userId, sectionId, nodeId, score, xpReward) {
  const supabase = getSupabase();

  try {
    // Upsert completed node (insert or update if already exists)
    const { error: completedError } = await supabase
      .from('completed_nodes')
      .upsert({
        user_id: userId,
        section_id: sectionId,
        node_id: nodeId,
        xp_earned: xpReward,
        score,
        completed_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,section_id,node_id'
      });

    if (completedError) throw completedError;

    // Get current user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('xp, level, streak')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    const currentXP = userData.xp || 0;
    const currentLevel = userData.level || 1;
    const currentStreak = userData.streak || 0;

    let newXP = currentXP + xpReward;
    let newLevel = currentLevel;

    // Level up if XP >= 100
    while (newXP >= 100) {
      newXP -= 100;
      newLevel += 1;
    }

    // Update user XP and level
    const { error: updateError } = await supabase
      .from('users')
      .update({
        xp: newXP,
        level: newLevel,
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    // Update user_practice_stats
    const { data: stats } = await supabase
      .from('user_practice_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (stats) {
      await supabase
        .from('user_practice_stats')
        .update({
          total_nodes_completed: (stats.total_nodes_completed || 0) + 1,
          total_xp_earned: (stats.total_xp_earned || 0) + xpReward,
          last_practice_date: new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);
    }

    return {
      xpGained: xpReward,
      newXP,
      newLevel,
      currentStreak,
      leveledUp: newLevel > currentLevel,
    };
  } catch (error) {
    console.error('Error submitting node completion');
    throw error;
  }
}

