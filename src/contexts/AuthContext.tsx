import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  googleSignIn: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await AuthApi.getProfile();
      if (data && !error) {
        setUser(data);
        setToken(localStorage.getItem("auth_token"));
      } else {
        // Invalid token
        localStorage.removeItem("auth_token");
        setToken(null);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      localStorage.removeItem("auth_token");
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await AuthApi.signIn({ email, password });
      if (data && !error) {
        const { user: userData, token: authToken } = data;
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("auth_token", authToken);
        toast({
          title: "Welcome back!",
          description: `You're signed in as ${userData.name}`,
        });
        return true;
      }
      if (error) {
        toast({
          title: "Sign in failed",
          description: error,
          variant: "destructive",
        });
      }
      return false;
    } catch (error) {
      console.error("Sign in failed:", error);
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await AuthApi.signUp({ name, email, password });
      if (data && !error) {
        const { user: userData, token: authToken } = data;
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("auth_token", authToken);
        toast({
          title: "Account created",
          description: "Your account has been created successfully!",
        });
        return true;
      }
      if (error) {
        toast({
          title: "Sign up failed",
          description: error,
          variant: "destructive",
        });
      }
      return false;
    } catch (error) {
      console.error("Sign up failed:", error);
      toast({
        title: "Sign up failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    setToken(null);
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

//   const googleSignIn = async (): Promise<boolean> => {
//     // This would normally use the Google OAuth flow
//     // We need to implement Google Sign-In in the frontend
//     setIsLoading(true);
//     try {
//       // Mock implementation - in a real app, we would get the token from Google OAuth
//       const googleToken = "mock-google-token";
//       const { data, error } = await AuthApi.googleSignIn(googleToken);
      
//       if (data && !error) {
//         const { user: userData, token: authToken } = data;
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem("auth_token", authToken);
//         toast({
//           title: "Google Sign-In Successful",
//           description: `Welcome, ${userData.name}!`,
//         });
//         return true;
//       }
//       if (error) {
//         toast({
//           title: "Google Sign-In failed",
//           description: error,
//           variant: "destructive",
//         });
//       }
//       return false;
//     } catch (error) {
//       console.error("Google sign in failed:", error);
//       toast({
//         title: "Google Sign-In failed",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       });
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };
const googleSignIn = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Ensure global `google` object is available
    if (!window.google || !window.google.accounts) {
      toast({
        title: "Google Sign-In failed",
        description: "Google API not loaded.",
        variant: "destructive",
      });
      resolve(false);
      return;
    }
    
    window.google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID", // ⬅️ Replace with your real Google Client ID
      callback: async (response: any) => {
        setIsLoading(true);
        const token = response.credential; // This is a valid JWT

        try {
          const { data, error } = await AuthApi.googleSignIn(token);

          if (data && !error) {
            const { user: userData, token: authToken } = data;
            setUser(userData);
            setToken(authToken);
            localStorage.setItem("auth_token", authToken);

            toast({
              title: "Google Sign-In Successful",
              description: `Welcome, ${userData.name}!`,
            });
            resolve(true);
          } else {
            toast({
              title: "Google Sign-In failed",
              description: error || "Something went wrong.",
              variant: "destructive",
            });
            resolve(false);
          }
        } catch (err) {
          console.error("Google Sign-In Error:", err);
          toast({
            title: "Google Sign-In failed",
            description: "An unexpected error occurred.",
            variant: "destructive",
          });
          resolve(false);
        } finally {
          setIsLoading(false);
        }
      },
    });

    window.google.accounts.id.prompt(); // Opens Google Sign-In popup
  });
};
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

