console.log('supabase.js module loaded');
// Mock Supabase client for when credentials are missing
const supabaseObj = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          then: (cb) => cb({ data: [], error: null })
        })
      })
    })
  })
};
console.log('supabaseObj:', supabaseObj);
console.log('supabaseObj.auth:', supabaseObj.auth);
export const supabase = supabaseObj;