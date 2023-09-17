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
  alt = "ddddddddd",
  width = 100,
  height = 100,
  isDeleteBtn = false,
  deleteImage,
}: Partial<Image>) => {
  // let w = `w-[${width}]px`;
  // let h = `h-[${height}]px`;

  return (
    <div className="relative">
      {isDeleteBtn && (
        <div
          onClick={deleteImage}
          className="cursor-pointer absolute w-[20px] h-[20px] bg-[url('/icons/delete-btn-black.svg')] top-[-10px] right-[-10px]"
        ></div>
      )}
      <Image
        src={src}
        // src="https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg"
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
};

export default FileImage;
