import Image from "next/image";

export type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
  isDeleteBtn: boolean;
  deleteImage?: (e?: any) => void;
};

const FileImage = ({
  src = "",
  alt = "",
  width = 100,
  height = 100,
  isDeleteBtn = false,
  deleteImage,
}: Partial<Image>) => {
  return (
    <div className="relative">
      {isDeleteBtn && (
        <div
          onClick={deleteImage}
          className="cursor-pointer absolute w-[20px] h-[20px] bg-[url('/icons/delete-btn-black.svg')] top-[-10px] right-[-10px]"
        ></div>
      )}
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
};

export default FileImage;
