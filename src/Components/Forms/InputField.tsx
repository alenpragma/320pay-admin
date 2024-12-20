// import { Controller, useFormContext } from "react-hook-form"

// type TInputProps = {
//   name: string
//   type?: string
//   className?: string
//   placeholder?: string
//   requried?: boolean
//   defaultValue?: string | number
// }

// const InputField = ({
//   name,
//   type,
//   className,
//   placeholder,
//   defaultValue,
//   requried,
// }: TInputProps) => {
//   const { control } = useFormContext()
//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field, fieldState: { error } }) => (
//         <div className={`${type === "checkbox" ? "flex flex-col" : ""}`}>
//           <input
//             {...field}
//             type={type}
//             className={className}
//             placeholder={placeholder}
//             value={defaultValue}
//             required={requried}
//           />
//           {error && type !== "checkbox" ? (
//             <span className="text-[#e82828] text-[14px]">{error.message}</span>
//           ) : (
//             ""
//           )}
//         </div>
//       )}
//     />
//   )
// }

// export default InputField

import { HTMLInputTypeAttribute } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  maxlength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
};

const InputField = ({
  name,
  type,
  className,
  placeholder,
  defaultValue,
  required,
  maxlength,
  onChange,
  readonly,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={`${type === "checkbox" ? "flex flex-col" : ""}`}>
          <input
            {...field}
            type={type}
            className={`w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 ${className}`}
            placeholder={placeholder}
            required={required}
            maxLength={maxlength}
            onKeyDown={(e) => {
              if (type === "number") {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }
            }}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) onChange(e);
            }}
            readOnly={readonly}
          />
          {error && type !== "checkbox" && (
            <span className="text-[#e82828] text-[14px]">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default InputField;
