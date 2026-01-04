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
