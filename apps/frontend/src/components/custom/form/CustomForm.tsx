"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { FormField } from "./FormField";

type ZodError = {
  code: string;
  message: string;
  fatal: boolean;
  path: string[];
};

type CustomFormType = {
  schema: ZodSchema;
  onSubmit: (data: z.infer<ZodSchema>) => void;
  inputFields: FormField[];
  isError?: boolean;
  error?: Error | null;
  shouldReset: boolean;
  cancelHandler?: () => void;
  submitText?: string;
  cancelText?: string;
};

const CustomForm: React.FC<CustomFormType> = (props) => {
  const {
    schema,
    onSubmit,
    inputFields,
    isError,
    error,
    shouldReset,
    cancelHandler,
    submitText = "Save",
    cancelText = "Cancel",
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errs: ZodError[] = error.response?.data;
        errs.forEach((item) => {
          item.path.forEach((field: any) => {
            setError(field, { message: item.message });
          });
        });
      }
    }
  }, [error, isError]);

  const submitHandler = (data: z.infer<ZodSchema>) => {
    if (shouldReset) reset();
    onSubmit(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((field) => {
            if (field.type === "input") {
              return (
                <div className="space-y-2">
                  <Label htmlFor="courseCode">{field.label}</Label>
                  <Input
                    id="courseCode"
                    {...field.attributes}
                    {...register(field.name)}
                    className={errors[field.name] ? "border-destructive" : ""}
                  />
                  {errors[field.name] && (
                    <p className="text-sm text-destructive">
                      {String(errors?.[field.name]?.message) || ""}
                    </p>
                  )}
                </div>
              );
            }
            if (field.type === "textarea") {
              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Textarea
                    id={field.name}
                    {...field.attributes}
                    {...register(field.name)}
                    className={errors[field.name] ? "border-destructive" : ""}
                  />
                  {errors[field.name] && (
                    <p className="text-sm text-destructive">
                      {String(errors?.[field.name]?.message) || ""}
                    </p>
                  )}
                </div>
              );
            }
            if (field.type === "select") {
              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Select
                    onValueChange={(value: string) => {
                      setValue(field.name, value);
                    }}
                    defaultValue=""
                    value={watch(field.name) || ""}
                  >
                    <SelectTrigger
                      id={field.name}
                      className={errors.instructor ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder={field.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.values.map((v) => (
                        <SelectItem key={v.value} value={v.value}>
                          {v.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors[field.name] && (
                    <p className="text-sm text-destructive">
                      {String(errors?.[field.name]?.message) || ""}
                    </p>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {cancelHandler && (
            <Button onClick={cancelHandler} type="button" variant="outline">
              {cancelText}
            </Button>
          )}
          <Button type="submit" className="gap-2">
            <Save size={16} /> {submitText}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CustomForm;
