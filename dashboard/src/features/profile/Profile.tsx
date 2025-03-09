import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMediaQuery } from "@/hooks/use-media-query";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Edit, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  department: z.string(),
  title: z.string(),
  bio: z
    .string()
    .max(500, { message: "Bio cannot be longer than 500 characters." })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  fullName: "Admin User",
  email: "admin@university.edu",
  phone: "+1 (555) 123-4567",
  department: "Computer Science",
  title: "Department Administrator",
  bio: "Experienced department administrator with a focus on student success and faculty support.",
};

const ProfileContainer = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsEditing(false);
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1 p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/avatars/admin.png" alt="Admin User" />
              <AvatarFallback className="text-xl">AU</AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-semibold">{form.watch("fullName")}</h2>
            <p className="text-muted-foreground">{form.watch("title")}</p>

            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{form.watch("email")}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{form.watch("phone")}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <AtSign className="h-4 w-4 text-muted-foreground" />
                <span>{form.watch("department")}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="mt-6 w-full"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </Card>

        {/* Profile Form Card */}
        <Card className="md:col-span-2 p-6">
          {isEditing ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input placeholder="Your department" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Your job title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A brief description about yourself and your role.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Profile Information</h3>
                <p className="text-sm text-muted-foreground">
                  View your personal information below.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">About</h4>
                  <p className="mt-1 text-sm">
                    {form.watch("bio") || "No bio provided."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium">Full Name</h4>
                    <p className="mt-1 text-sm">{form.watch("fullName")}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Email</h4>
                    <p className="mt-1 text-sm">{form.watch("email")}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Phone</h4>
                    <p className="mt-1 text-sm">
                      {form.watch("phone") || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Department</h4>
                    <p className="mt-1 text-sm">{form.watch("department")}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Title</h4>
                    <p className="mt-1 text-sm">{form.watch("title")}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(true)}
                className="w-full md:w-auto"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default ProfileContainer;
