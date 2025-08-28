import Select, { components } from "react-select";
import { useDetalleCatalogo } from "../../hooks/useDetalleCatalogo";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";

type CatalogSelectFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  catalogo: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  isClearable?: boolean;
};

const UnstyledDropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <ChevronDownIcon className="size-4 opacity-50 transition-transform" />
  </components.DropdownIndicator>
);

const UnstyledClearIndicator = (props: any) => (
  <components.ClearIndicator {...props}>
    <XIcon className="size-4 opacity-70" />
  </components.ClearIndicator>
);

const UnstyledIndicatorSeparator = () => null;

// ✅ Option personalizado con check a la derecha (como shadcn)
const UnstyledOption = (props: any) => {
  const { isSelected, children } = props;
  return (
    <components.Option {...props}>
      <div className="relative flex w-full items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm">
        <span className="absolute right-2 flex size-3.5 items-center justify-center">
          <CheckIcon
            className={cn(
              "size-4 transition-opacity",
              isSelected ? "opacity-100" : "opacity-0"
            )}
          />
        </span>
        <span>{children}</span>
      </div>
    </components.Option>
  );
};

export function SelectInput<T extends object>({
  control,
  name,
  catalogo,
  label,
  placeholder = "Seleccione...",
  isClearable = true,
}: CatalogSelectFieldProps<T>) {
  const { data = [], isLoading } = useDetalleCatalogo(catalogo); // siempre array

  const options =
    data.detalles?.map((item: { id: number; nombre: string }) => ({
      value: String(item.id),
      label: item.nombre,
    })) || [];

  return (
    <div className="flex flex-col gap-1">
      {data.nombre && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {data.nombre}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Select
              // {...field}
              aria-label={`Select ${data.nombre}`}
              unstyled
              className="text-sm"
              classNames={{
                control: ({ isFocused }) =>
                  cn(
                    "flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow]",
                    "border-input",
                    "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "min-h-9", // = h-9
                    "dark:bg-input/30 dark:hover:bg-input/50", // = h-9
                    isFocused && "ring-[3px] ring-ring/50 border-ring"
                  ),
                valueContainer: () => "p-0 gap-2",
                placeholder: () => "text-muted-foreground",
                singleValue: () => "text-foreground",
                input: () => "text-foreground",

                indicatorsContainer: () => "gap-1",
                dropdownIndicator: ({ selectProps }) =>
                  cn(
                    "text-muted-foreground px-1",
                    selectProps.menuIsOpen ? "rotate-180" : "rotate-0"
                  ),
                clearIndicator: () =>
                  "px-1 text-muted-foreground hover:text-foreground",
                indicatorSeparator: () => "bg-accent",

                // Content
                menu: () =>
                  cn(
                    "relative z-50 mt-1 rounded-md border shadow-md",
                    "bg-popover text-popover-foreground"
                  ),
                menuList: () => "p-1 max-h-60 overflow-auto",

                // Item
                option: ({ isDisabled, isFocused }) =>
                  cn(
                    "rounded-sm py-1.5 pr-8 pl-2 text-sm cursor-pointer select-none",
                    isDisabled && "pointer-events-none opacity-50",
                    isFocused
                      ? "bg-accent text-accent-foreground"
                      : "bg-transparent"
                  ),

                noOptionsMessage: () =>
                  "px-2 py-2 text-sm text-muted-foreground",
                loadingMessage: () => "px-2 py-2 text-sm text-muted-foreground",
              }}
              classNamePrefix="custom-select"
              isClearable={isClearable}
              isLoading={isLoading}
              placeholder={placeholder}
              options={options}
              onChange={(option) => field.onChange(option?.value || null)}
              value={options.find((opt) => opt.value === field.value) || null}
              components={{
                DropdownIndicator: UnstyledDropdownIndicator,
                IndicatorSeparator: UnstyledIndicatorSeparator,
                ClearIndicator: UnstyledClearIndicator,
                Option: UnstyledOption, // 👈 aquí va el check
              }}
              noOptionsMessage={() => "No se encontraron resultados"}
              // isMulti
              menuPlacement="auto"
            />
          );
        }}
      />
    </div>
  );
}
