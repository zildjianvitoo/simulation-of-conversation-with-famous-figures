"use client";
import { CldUploadButton } from "next-cloudinary";
import NoSSR from "./NoSSR";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
};

export default function ImageUpload({ onChange, value, disabled }: Props) {
  return (
    <NoSSR>
      <div className="flex space-y-4 flex-col w-full justify-center items-center">
        <CldUploadButton
          onUpload={(result: any) => onChange(result.info.secure_url)}
          options={{
            maxFiles: 1,
          }}
          uploadPreset="i1dwfoen"
        >
          <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
            <div className="relative h-40 w-40">
              <Image
                fill
                alt="upload"
                src={value || "/placeholder.png"}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </CldUploadButton>
      </div>
    </NoSSR>
  );
}
