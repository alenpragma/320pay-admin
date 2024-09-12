// import {
//   FieldValues,
//   FormProvider,
//   SubmitHandler,
//   useForm,
// } from "react-hook-form";
// type TFormConfig = {
//   resolver?: any;
//   defaultValues?: Record<string, any>;
// };

// type TFromProps = {
//   children: React.ReactNode;
//   onSubmit: SubmitHandler<FieldValues>;
// } & TFormConfig;
// const Form = ({ children, onSubmit, resolver, defaultValues }: TFromProps) => {
//   const formConfig: TFormConfig = {};
//   if (resolver) {
//     formConfig["resolver"] = resolver;
//   }
//   if (defaultValues) {
//     formConfig["defaultValues"] = defaultValues;
//   }
//   const methods = useForm(formConfig);
//   const { handleSubmit, reset } = methods;

//   const submit: SubmitHandler<FieldValues> = (data) => {
//     reset();
//     onSubmit(data);
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(submit)}>{children}</form>
//     </FormProvider>
//   );
// };

// export default Form;

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { useEffect } from "react"

type TFormConfig = {
  resolver?: any
  defaultValues?: Record<string, any>
}

type TFormProps = {
  children: React.ReactNode
  onSubmit: SubmitHandler<FieldValues>
  onChange?: (data: FieldValues) => void
} & TFormConfig

const Form = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
  onChange,
}: TFormProps) => {
  const formConfig: TFormConfig = {}
  if (resolver) {
    formConfig["resolver"] = resolver
  }
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues
  }
  const methods = useForm(formConfig)
  const { handleSubmit, watch, setValue, reset } = methods

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data)
    // reset()
  }

  // Control logic for form state changes
  useEffect(() => {
    const subscription = watch((data) => {
      // console.log("Current form values:", data);

      // Example: Automatically setting a field value based on another field's value
      if (data.fieldA === "specificValue") {
        setValue("fieldB", "newValue")
      }

      // Call external onChange if provided
      if (onChange) {
        onChange(data)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setValue, onChange])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  )
}

export default Form

// import {
//   FieldValues,
//   FormProvider,
//   SubmitHandler,
//   useForm,
// } from "react-hook-form";

// type TFormConfig = {
//   resolver?: any;
//   defaultValues?: Record<string, any>;
// };

// type TFromProps = {
//   children: React.ReactNode;
//   onSubmit: SubmitHandler<FieldValues>;
// } & TFormConfig;
// const Form = ({
//   children,
//   onSubmit,
//   resolver,
//   defaultValues,
// }: TFromProps) => {
//   const formConfig: TFormConfig = {};
//   if (resolver) {
//     formConfig["resolver"] = resolver;
//   }
//   if (defaultValues) {
//     formConfig["defaultValues"] = defaultValues;
//   }
//   const methods = useForm(formConfig);
//   const { handleSubmit, reset } = methods;

//   const submit: SubmitHandler<FieldValues> = async (data) => {
//     try {
//       await onSubmit(data);
//       // reset(); // Reset form only after successful API response
//     } catch (error) {
//       // Handle API error if needed, form won't reset
//       console.error("API call failed:", error);
//     }
//   };
//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(submit)}>{children}</form>
//     </FormProvider>
//   );
// };

// export default Form;
