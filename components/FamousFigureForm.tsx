"use client";

import { Category, FamousFigure } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

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
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
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
                <FormControl>Komponen untuk upload gambar</FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
