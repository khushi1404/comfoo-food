import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://vmwsvglhyppiwdgyeala.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtd3N2Z2xoeXBwaXdkZ3llYWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MDI4NTgsImV4cCI6MjAyOTk3ODg1OH0.KTQjR0xuW_URo6hnMWlzRUPMevH0aGs6nIRt4JxR8co"


export const supabase = createClient(supabaseUrl,supabaseAnonKey)