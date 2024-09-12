import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {

};

const OtpField = () => {
  const { control } = useFormContext();
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Controller
        control={control}
          key={index}
          name={`otp.${index}`}
          render={({ field }) => (
            <input
              {...field}
              type="tel"
              maxLength={1}
              className="w-12 h-12 text-center border rounded-md"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;

                // Allow only digits
                if (/^\d$/.test(value)) {
                  field.onChange(value);
                  if (index < 3) {
                    const nextSibling =
                      target.nextElementSibling as HTMLInputElement | null;
                    nextSibling?.focus();
                  }
                } else {
                  // Prevent non-digit input
                  target.value = field.value;
                }
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (
                  target.value.length > 0 &&
                  index < 3 &&
                  /^\d$/.test(target.value)
                ) {
                  const nextSibling =
                    target.nextElementSibling as HTMLInputElement | null;
                  nextSibling?.focus();
                }
              }}
            />
          )}
        />
      ))}
    </>
  );
};

export default OtpField;
