
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventsApi, Event } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type FormData = Omit<Event, "id">;

const CreateEvent = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const { isAuthenticated, token } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    if (!isAuthenticated || !token) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create an event",
        variant: "destructive",
      });
      navigate("/sign-in");
      return;
    }

    try {
      // Convert skills array from comma-separated string
      const formattedData = {
        ...data,
        skills: data.skills ? data.skills.toString().split(",").map(skill => skill.trim()) : undefined,
        isVirtual: data.location?.toLowerCase().includes("online") || data.location?.toLowerCase().includes("virtual"),
      };
      
      const response = await EventsApi.createEvent(formattedData, token);
      
      if (response.data) {
        toast({
          title: "Event created",
          description: "Your event has been created successfully!",
        });
        navigate(`/events/${response.data.id}`);
      } else {
        throw new Error(response.error || "Failed to create event");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Failed to create event",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
            
            {!isAuthenticated && (
              <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-900 text-yellow-800 dark:text-yellow-300 rounded-lg">
                <p className="font-semibold">Authentication required</p>
                <p className="text-sm mt-1">You need to be signed in to create an event.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium">
                      Event Title *
                    </label>
                    <Input
                      id="title"
                      {...register("title", { required: "Title is required" })}
                      placeholder="Enter event title"
                      className={errors.title ? "border-red-300 focus-visible:ring-red-300" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="organizer" className="block text-sm font-medium">
                      Organizer *
                    </label>
                    <Input
                      id="organizer"
                      {...register("organizer", { required: "Organizer is required" })}
                      placeholder="Who is organizing this event?"
                      className={errors.organizer ? "border-red-300 focus-visible:ring-red-300" : ""}
                    />
                    {errors.organizer && (
                      <p className="text-sm text-red-500">{errors.organizer.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="date" className="block text-sm font-medium">
                      Event Date *
                    </label>
                    <Input
                      id="date"
                      {...register("date", { required: "Date is required" })}
                      placeholder="e.g., Dec 15-17, 2023"
                      className={errors.date ? "border-red-300 focus-visible:ring-red-300" : ""}
                    />
                    {errors.date && (
                      <p className="text-sm text-red-500">{errors.date.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-medium">
                      Location *
                    </label>
                    <Input
                      id="location"
                      {...register("location", { required: "Location is required" })}
                      placeholder="e.g., San Francisco, CA or Online"
                      className={errors.location ? "border-red-300 focus-visible:ring-red-300" : ""}
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500">{errors.location.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="type" className="block text-sm font-medium">
                      Event Type *
                    </label>
                    <Input
                      id="type"
                      {...register("type", { required: "Event type is required" })}
                      placeholder="e.g., Hackathon, Workshop, Conference"
                      className={errors.type ? "border-red-300 focus-visible:ring-red-300" : ""}
                    />
                    {errors.type && (
                      <p className="text-sm text-red-500">{errors.type.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="imageUrl" className="block text-sm font-medium">
                      Image URL *
                    </label>
                    <Input
                      id="imageUrl"
                      {...register("imageUrl", { required: "Image URL is required" })}
                      placeholder="URL to event banner image"
                      className={errors.imageUrl ? "border-red-300 focus-visible:ring-red-300" : ""}
                    />
                    {errors.imageUrl && (
                      <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    rows={5}
                    placeholder="Provide details about the event"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="registrationDeadline" className="block text-sm font-medium">
                      Registration Deadline
                    </label>
                    <Input
                      id="registrationDeadline"
                      {...register("registrationDeadline")}
                      placeholder="e.g., Dec 10, 2023"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="registrationUrl" className="block text-sm font-medium">
                      Registration URL
                    </label>
                    <Input
                      id="registrationUrl"
                      {...register("registrationUrl")}
                      placeholder="URL for event registration"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="skills" className="block text-sm font-medium">
                      Skills (comma-separated)
                    </label>
                    <Input
                      id="skills"
                      {...register("skills")}
                      placeholder="e.g., JavaScript, Python, AI"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="eligibility" className="block text-sm font-medium">
                      Eligibility
                    </label>
                    <Input
                      id="eligibility"
                      {...register("eligibility")}
                      placeholder="Who can participate?"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="prizes" className="block text-sm font-medium">
                    Prizes
                  </label>
                  <Input
                    id="prizes"
                    {...register("prizes")}
                    placeholder="e.g., $10,000 in cash prizes, mentorship opportunities"
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
                <ButtonCustom
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </ButtonCustom>
                <ButtonCustom
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  disabled={!isAuthenticated}
                >
                  Create Event
                </ButtonCustom>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateEvent;
