// import { Controller, useFormContext } from "react-hook-form"
// import Select from "react-select"

// type TOption = {
//   label: string
//   value: string
//   // id?: string
// }

// type TSelectProps = {
//   name: string;
//   className?: string;
//   options: TOption[];
//   placeholder?: string;
//   required?: boolean;
//   onChange?: (value: string) => void;
// };

// const SelectField = ({
//   name,
//   className,
//   options,
//   placeholder,
//   required,
//   onChange,
// }: TSelectProps) => {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field, fieldState: { error } }) => (
//         <div className="flex flex-col">
//           <Select
//             {...field}
//             options={options}
//             placeholder={placeholder}
//             className={className}
//             isClearable={!required}
//             value={
//               options.find((option) => option.value === field.value) || null
//             }
//             onChange={(option) => {
//               field.onChange(option?.value);
//               if (onChange) {
//                 onChange(option?.value || "") // Call the parent onChange
//               }
//             }}
//             onBlur={field.onBlur}
//           />
//           {error ? (
//             <span className="text-[#e82828] text-[14px]">{error.message}</span>
//           ) : (
//             ""
//           )}
//         </div>
//       )}
//     />
//   );
// };

// export default SelectField;

import { Controller, useFormContext } from "react-hook-form"
import Select, { components } from "react-select"

type TOption = {
  label: string
  value: string
  image?: string
}

type TSelectProps = {
  name: string
  className?: string
  options: TOption[]
  placeholder?: string
  required?: boolean
  type?: string | undefined
  onChange?: (value: string) => void
}

const SelectField = ({
  name,
  className,
  options,
  // type,
  placeholder,
  required,
  onChange,
}: TSelectProps) => {
  const { control } = useFormContext()

  // Custom Option component to show the image and label
  const CustomOption = (props: any) => (
    <components.Option {...props}>
      <div className="flex items-center">
        {props.data.image && (
          <img
            src={props.data.image}
            alt={props.data.label}
            className="w-6 h-6 mr-2"
          />
        )}
        {props.data.label}
      </div>
    </components.Option>
  )

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col">
          <Select
            {...field}
            // type={type}
            options={options}
            placeholder={placeholder}
            className={className}
            isClearable={!required}
            value={
              options.find((option) => option.value === field.value) || null
            }
            onChange={(option) => {
              field.onChange(option?.value)
              if (onChange) {
                onChange(option?.value || "") // Call the parent onChange
              }
            }}
            onBlur={field.onBlur}
            components={{ Option: CustomOption }} // Use custom option component
          />
          {error && (
            <span className="text-[#e82828] text-[14px]">{error.message}</span>
          )}
        </div>
      )}
    />
  )
}

export default SelectField
