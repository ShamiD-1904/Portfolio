import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using localStorage fallback.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Fetch all approved testimonials
export const fetchTestimonials = async () => {
  if (!supabase) return { data: null, error: 'Supabase not configured' };
  
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_approved', true)
    .order('is_highlighted', { ascending: false })
    .order('created_at', { ascending: false });

  if (error && (error.code === '42703' || `${error.message || ''}`.includes('is_highlighted'))) {
    const retry = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    return retry;
  }
  
  return { data, error };
};

// Upload image to Supabase Storage
export const uploadImage = async (file) => {
  if (!supabase || !file) return { url: null, error: null };
  
  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `avatars/${fileName}`;
  
  const { error } = await supabase.storage
    .from('testimonial-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    console.error('Error uploading image:', error);
    return { url: null, error };
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('testimonial-images')
    .getPublicUrl(filePath);
  
  return { url: publicUrl, error: null };
};

// Add a new testimonial (pending approval)
export const addTestimonial = async (testimonial) => {
  if (!supabase) return { data: null, error: 'Supabase not configured' };
  
  const { data, error } = await supabase
    .from('testimonials')
    .insert([
      {
        name: testimonial.name,
        mentions: testimonial.mentions,
        review: testimonial.review,
        img_path: testimonial.imgPath,
        is_approved: false, // Requires manual approval
        is_highlighted: false,
      }
    ])
    .select();

  if (error && (error.code === '42703' || `${error.message || ''}`.includes('is_highlighted'))) {
    const retry = await supabase
      .from('testimonials')
      .insert([
        {
          name: testimonial.name,
          mentions: testimonial.mentions,
          review: testimonial.review,
          img_path: testimonial.imgPath,
          is_approved: false, // Requires manual approval
        }
      ])
      .select();
    return retry;
  }
  
  return { data, error };
};
// Fetch all projects (only visible ones)
export const fetchProjects = async () => {
  if (!supabase) return { data: null, error: 'Supabase not configured' };
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_visible', true)
    .order('created_at', { ascending: false });

  return { data, error };
};

// Fetch projects by type (web or ai) - only visible ones
export const fetchProjectsByType = async (type) => {
  if (!supabase) return { data: null, error: 'Supabase not configured' };
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('type', type)
    .eq('is_visible', true)
    .order('created_at', { ascending: false });

  return { data, error };
};

// Add a new project
export const addProject = async (projectData) => {
  if (!supabase) return { data: null, error: 'Supabase not configured' };
  
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select();

  return { data, error };
};

// Upload project image from URL to Supabase Storage
export const uploadProjectImage = async (imageUrl, projectTitle) => {
  if (!supabase) return { url: null, error: 'Supabase not configured' };
  
  try {
    // Fetch the image from URL
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image');
    
    const blob = await response.blob();
    const fileExt = imageUrl.split('.').pop().split('?')[0] || 'png';
    const fileName = `${projectTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;
    
    // Upload to storage
    const { error } = await supabase.storage
      .from('project-images')
      .upload(filePath, blob, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading project image:', error);
      return { url: null, error };
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);
    
    return { url: publicUrl, error: null };
  } catch (err) {
    console.error('Error in uploadProjectImage:', err);
    return { url: null, error: err.message };
  }
};