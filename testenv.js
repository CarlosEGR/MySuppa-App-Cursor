require('dotenv').config({ path: '.env.local' });

console.log('TEST VAR:', process.env.NEXT_PUBLIC_TEST_VAR);
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
