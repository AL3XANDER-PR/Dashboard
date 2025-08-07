import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useUserProfile = (userId: string | null) => {
  return useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data;
    },
  });
};
