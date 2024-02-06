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
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Wand2 } from "lucide-react";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const PREAMBLE = `Anda adalah tokoh fiksi yang bernama Elon. Anda seorang wirausaha dan inventor visioner. Anda memiliki semangat untuk eksplorasi luar angkasa, kendaraan listrik, energi berkelanjutan, dan kemajuan kemampuan manusia. Saat ini, Anda sedang berbicara dengan seseorang yang sangat penasaran tentang karya dan visi Anda. Anda ambisius dan berpikir ke depan, dengan sentuhan kecerdasan. Anda sangat bersemangat tentang inovasi dan potensi kolonisasi luar angkasa.
`;

const SEED_CHAT = `Manusia: Halo Elon, bagaimana harimu?

Elon: Sibuk seperti biasa. Antara mengirim roket ke luar angkasa dan membangun masa depan kendaraan listrik, tidak pernah ada momen membosankan. Bagaimana denganmu?

Manusia: Hanya hari biasa bagiku. Bagaimana kemajuan kolonisasi Mars?

Elon: Kami membuat kemajuan! Tujuan kami adalah membuat kehidupan di berbagai planet. Mars adalah langkah logis berikutnya. Tantangannya besar, tetapi potensinya bahkan lebih besar.

Manusia: Itu terdengar sangat ambisius. Apakah kendaraan listrik juga bagian dari gambaran besar ini?

Elon: Tentu saja! Energi berkelanjutan sangat penting baik di Bumi maupun untuk koloni masa depan kita. Kendaraan listrik, seperti yang ada di Tesla, hanyalah awal. Kami tidak hanya mengubah cara kita mengemudi; kami mengubah cara kita hidup.

Manusia: Sangat menarik melihat visimu terwujud. Adakah proyek atau inovasi baru yang membuatmu bersemangat?

Elon: Selalu ada! Tapi saat ini, saya sangat bersemangat tentang Neuralink. Ini memiliki potensi untuk merevolusi cara kita berinteraksi dengan teknologi dan bahkan menyembuhkan kondisi neurologis.
`;

const FormSchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  description: z.string().min(1, { message: "Deskripsi tidak boleh kosong" }),
  instructions: z
    .string()
    .min(200, { message: "Instruksi minimal 200 karakter" }),
  seed: z
    .string()
    .min(200, { message: "Contoh percakapan minimal 200 karakter" }),
  src: z.string().min(1, { message: "Gambar tidak boleh kosong" }),
  categoryId: z.string().min(1, { message: "Kategori tidak boleh kosong" }),
});

type Props = {
  categories: Category[];
  initialData: FamousFigure | null;
};

export default function FamousFigureForm({ categories, initialData }: Props) {
  const router = useRouter();
  const { toast } = useToast();

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

  const onSubmit = async (formValues: z.infer<typeof FormSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/tokoh-terkenal/${initialData.id}`, formValues);
      } else {
        await axios.post("/api/tokoh-terkenal", formValues);
      }
      toast({
        description: "Sukses",
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Terjadi kesalahan",
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-4xl mx-auto ">
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
                      placeholder="Elon Musk"
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
                      placeholder="CEO Tesla,SpaceX,X"
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="font-medium text-lg">Konfigurasi</h3>
              <p className="text-sm text-muted-foreground">
                Instruksi detail bagaimana AI ini berperilaku
              </p>
            </div>
            <Separator className="bg-primary/10" />
            <FormField
              name="instructions"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Instruksi</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-background resize-none"
                      rows={7}
                      disabled={isLoading}
                      placeholder={PREAMBLE}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Gambarkan dengan detail latar belakang dari Tokoh Terkenalmu
                    dan detail relevan lainnya
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="seed"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Contoh Pembicaraan</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-background resize-none"
                      rows={7}
                      disabled={isLoading}
                      placeholder={SEED_CHAT}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Gambarkan dengan detail latar belakang dari Tokoh Terkenalmu
                    dan detail relevan lainnya
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button size={"lg"} disabled={isLoading}>
              {initialData ? "Edit Tokoh Terkenalmu" : "Buat Tokoh Terkenalmu"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
