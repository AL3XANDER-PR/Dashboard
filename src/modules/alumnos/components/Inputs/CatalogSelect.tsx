// modules/alumnos/components/Inputs/CatalogSelectField.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, type FieldPath, type FieldValues } from "react-hook-form";
import { useDetalleCatalogo } from "../../hooks/useDetalleCatalogo";

type CatalogSelectFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  catalogo: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function CatalogSelectField<TFieldValues extends FieldValues>({
  control,
  name,
  catalogo,
  label,
  placeholder = "Seleccione una opción",
  disabled = false,
}: CatalogSelectFieldProps<TFieldValues>) {
  const { data: opciones, isLoading } = useDetalleCatalogo(catalogo);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const stringValue =
          field.value !== undefined && field.value !== null
            ? String(field.value) // Radix Select siempre trabaja en string
            : undefined; // placeholder visible

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Select
              disabled={disabled || isLoading}
              value={stringValue}
              onValueChange={(v) => field.onChange(Number(v))} // <- volvemos a number para el form
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {opciones?.map((opt) => (
                  <SelectItem key={opt.id} value={String(opt.id)}>
                    {opt.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
