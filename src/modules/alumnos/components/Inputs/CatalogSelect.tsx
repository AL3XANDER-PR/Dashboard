import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDetalleCatalogo } from "../../hooks/useDetalleCatalogo";

interface CatalogSelectProps {
  catalogo: string;
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function CatalogSelect({
  catalogo,
  value,
  onChange,
  label,
}: CatalogSelectProps) {
  const { data: items, isLoading } = useDetalleCatalogo(catalogo);

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={onChange} disabled={isLoading}>
        <SelectTrigger>
          <SelectValue
            placeholder={isLoading ? "Cargando..." : "Seleccione..."}
          />
        </SelectTrigger>
        <SelectContent>
          {items?.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
