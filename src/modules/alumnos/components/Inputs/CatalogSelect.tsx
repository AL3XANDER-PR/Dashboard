import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDetalleCatalogo } from "../../hooks/useDetalleCatalogo";

type CatalogSelectProps = {
  catalogo: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function CatalogSelect({
  catalogo,
  value,
  onChange,
  placeholder = "Seleccione una opción",
  disabled = false,
}: CatalogSelectProps) {
  // console.log("💻 - CatalogSelect - catalogo:", catalogo);
  // console.log("💻 - CatalogSelect - value:", value);
  const { data: opciones, isLoading, isError } = useDetalleCatalogo(catalogo);

  if (isLoading) return null;

  return (
    <Select
      disabled={isLoading || disabled}
      onValueChange={onChange}
      value={value ? String(value) : ""}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {opciones?.map((item) => (
          <SelectItem key={item.id} value={String(item.id)}>
            {item.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
