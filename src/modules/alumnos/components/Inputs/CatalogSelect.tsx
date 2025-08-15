// modules/alumnos/components/Inputs/CatalogSelectField.tsx
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { useDetalleCatalogo } from "../../hooks/useDetalleCatalogo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

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
}: CatalogSelectFieldProps<TFieldValues>) {
  const {
    data: opciones = [],
    isLoading,
    isError,
  } = useDetalleCatalogo(catalogo); // siempre array

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    " justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={isLoading || isError}
                >
                  {isLoading && "Cargando..."}
                  {isError && "Error"}
                  {!isLoading &&
                    !isError &&
                    (field.value
                      ? opciones.find(
                          (op: any) => String(op.id) === String(field.value)
                        )?.nombre
                      : `Seleccionar ${label}`)}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
              <Command>
                <CommandInput
                  placeholder={`Buscar ${label}...`}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No encontrado.</CommandEmpty>
                  <CommandGroup>
                    {opciones.map((op: any) => (
                      <CommandItem
                        value={op.nombre}
                        key={op.id}
                        onSelect={() => field.onChange(String(op.id))}
                      >
                        {op.nombre}
                        <Check
                          className={cn(
                            "ml-auto",
                            String(op.id) === String(field.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
