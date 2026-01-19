import { createClient } from "@supabase/supabase-js";

const url = "https://sosbeelfdqjhfyghgoqm.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc2JlZWxmZHFqaGZ5Z2hnb3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMzA2NjgsImV4cCI6MjA3OTgwNjY2OH0.WbA2YyeUh9XiZo2yJpLt0Lj4Fs9u44N7E3W94oAGhkY";

const supabase = createClient(url, key);

/**
 * @param {File} file - Upload karana file eka
 * @param {string} bucketName - (Optional) Bucket eke nama. Default eka "images"
 */
export default async function uploadMediaToSupabase(file, bucketName = "images") {
  return new Promise(async (resolve, reject) => {
    // 1. File eka nathnam check karanna
    if (!file) {
      return reject("File not added");
    }

    // 2. Unique file name ekak hadaganna
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;

    try {
      // 3. Adala bucket ekata upload kireema
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // 4. Public URL eka laba ganeema
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      resolve(urlData.publicUrl);
    } catch (err) {
      console.error("Supabase Error:", err.message || err);
      reject(err.message || err);
    }
  });
}