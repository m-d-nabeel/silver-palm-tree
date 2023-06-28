"use client";
import { ProjectInterface, SessionInterface } from "@/common.types";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createProject, fetchToken, updateProject } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

export default function ProjectForm({ type, session, project }: Props) {
  const router = useRouter();
  const form = {
    image: project?.image || "",
    title: project?.title || "",
    description: project?.description || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  };
  const [formData, setFormData] = useState(form);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = await fetchToken();
    try {
      if (type === "create") {
        await createProject(formData, session?.user?.id, token);
        router.push("/");
      }
      if (type === "edit") {
        await updateProject(formData, project?.id ?? "", token);
        router.push("/");
      }
    } catch (error: any) {
      console.error("form submit error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      alert("Please upload an image file");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!formData.image && "Choose poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleImageChange}
        />
        {formData.image && (
          <Image
            src={formData.image}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={formData.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        isTextArea
        title="Description"
        state={formData.description}
        placeholder="Flexibble is the world's leading community for creators to share, grow, and get hired"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        title="Website URL"
        type="url"
        state={formData.liveSiteUrl}
        placeholder="https://www.flexibble.com"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        title="Github URL"
        type="url"
        state={formData.githubUrl}
        placeholder="https://www.github.com/m-d-nabeel/"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <CustomMenu
        title="Category"
        state={formData.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <div className="flexStart w-full">
        <Button
          type="submit"
          title={
            isSubmitting
              ? `${type === "create" ? "Creating..." : "Updating..."}`
              : `${type === "create" ? "Create" : "Update"}`
          }
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
}
