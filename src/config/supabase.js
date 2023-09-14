import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://raejzipzwomohblrufcm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZWp6aXB6d29tb2hibHJ1ZmNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMyMDQ0MTIsImV4cCI6MjAwODc4MDQxMn0.LpL78nJfv9SPQCXV_i6f1-HIYBx_otnGk1wmmE98NJo"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;