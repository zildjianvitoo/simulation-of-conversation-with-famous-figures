"use client";

import { Category, FamousFigure } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import ImageUpload from "./ImageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  description: z.string().min(1, { message: "Deskripsi tidak boleh kosong" }),
  instructions: z
    .string()
    .min(200, { message: "Instruksi minimal 200 karakter" }),
  seed: z
    .string()
    .min(200, { message: "Contoh percakapan minimal 200 karakter" }),
  src: z.string().min(200, { message: "Gambar tidak boleh kosong" }),
  categoryId: z.string().min(200, { message: "Kategori tidak boleh kosong" }),
});

type Props = {
  categories: Category[];
  initialData: FamousFigure | null;
};

export default function FamousFigureForm({ categories, initialData }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      categoryId: undefined,
      description: "",
      instructions: "",
      name: "",
      seed: "",
      src: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (formValues: z.infer<typeof FormSchema>) => {
    console.log(formValues);
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-4xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Informasi Umum</h3>
              <p className="text-sm text-muted-foreground">
                Informasi umum tentang Tokoh Terkenalmu
              </p>
            </div>
            <Separator className="bg-primary/10 " />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                <FormControl>
                  <ImageUpload
                    onChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cristiano Ronaldo"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Nama Tokoh Terkenalmu</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seorang Pesepak bola asal Portugal yang bermain untuk Al Nasr"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Deskripsi pendek tentang Tokoh Terkenalmu
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Pilih kategori"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Pilih kategori Tokoh Terkenalmu
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
