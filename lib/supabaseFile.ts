import { toast } from 'sonner';
import { supabase } from './supabaseClient';

// make props

export async function uploadFile(
  file: File,
  filename?: string,
  basket?: string
) {
  try {
    const { data, error } = await supabase.storage
      .from(basket || 'hotel-booking')
      .upload(filename || file.name, file, {
        upsert: true
      });
    if (error) {
      console.log(error);
      toast.error('Error uploading file');
      return error;
    } else {
      toast.success('File uploaded successfully');
      return data;
    }
  } catch (error) {
    console.error(error);
    toast.error('An error occurred while uploading file');
    return error;
  }
}

export async function retrievePublicUrl(filename: string, basket?: string) {
  try {
    const { data, error } = await supabase.storage
      .from('hotel-booking')
      .getPublicUrl(filename);
    if (error) {
      console.log(error);
      toast.error('Error retrieving file URL');
      return error;
    } else {
      toast.success('File URL retrieved successfully');
      return data;
    }
  } catch (error) {}
}
