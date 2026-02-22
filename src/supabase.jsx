import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gaztihhknenpfqcyowjg.supabase.co";
const supabaseKey = "sb_publishable_P9qpLIiJuJ-BxAFA1X48IQ_Y7pLdPH8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
