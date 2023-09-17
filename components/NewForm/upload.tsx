import { useFieldArray, useFormContext } from "react-hook-form";
import Box from "../Box/box";
import FileImage from "../Image/image";

export interface IUploadFile {
  /**useForm 필드값 관리용 이름 & request요청 시 필드 이름*/
  name: string;
  /**파일의 형식를 설정합니다. */
  type?: "image" | "audio" | "application" | "text";
  /**현재 값을 받아 validation 체크를 해줌 */
  rules?: any;
  height?: any;
}

const FormUpload = ({ name, type = "image", rules, height }: IUploadFile) => {
  /**useFormContext함수를 이용해서 props drilling 없이 useForm의 반환값들을  바로 받아올수있다.
   * !!부모컴포넌트를 FormProvider로 감싸줘야 가능.
   */
  const {
    getValues,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules,
  });

  //왜 useFieldArray 만 root라는 객체를 거쳐야 나오는지 ?....
  const errorMessages = errors[name] ? errors[name]?.root?.message : "";
  // const errorMessages = errors[name] ? errors[name].message : "";
  const hasError = !!(errors && errorMessages);

  const fileArray = getValues(name);

  const saveImgFile = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      append({ img: reader.result as string });
    };
  };

  return (
    <>
      <div className="flex items-center gap-[20px]">
        <Box gap={10}>
          {fields.map((field, idx) => {
            return (
              <FileImage
                key={field.id}
                src={fileArray[idx].img}
                isDeleteBtn
                deleteImage={() => remove(idx)}
                height={height}
              />
            );
          })}
        </Box>
        <div className="h-[38px] flex items-center px-2 gap-[10px] border rounded-md border-gray70 bg-slate-50">
          <input
            type="file"
            className="sr-only"
            id="fileupload"
            onChange={(e) => saveImgFile(e)}
          />
          <label
            htmlFor="fileupload"
            className="w-[20px] h-[16px] bg-[url('/icons/camera.svg')]"
          ></label>
          <label htmlFor="fileupload">이미지 선택</label>
        </div>
        {fileArray?.length === 0 && <span>선택된 파일 없음</span>}
      </div>
      {hasError && (
        <span className="text-warning1">- {errorMessages as string}</span>
      )}
    </>
  );
};

export default FormUpload;
