import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Alumno } from "../pages/AlumnosPage";
import type { Row } from "@tanstack/react-table";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

interface Props {
  rows: Row<Alumno>;
  handleDelete?: (id: string) => void;
}

export default function MobileAlumnosList({ rows, handleDelete }: Props) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div className="grid grid-cols-1 gap-3">
      {rows.map((row) => {
        const a = row.original;
        const nombres = a.nombres ?? "";
        const initials = nombres
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        const isExpanded = expanded[a.id] ?? false;

        return (
          <Card key={a.id} className="p-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                {a.img ? (
                  <AvatarImage src={a.img} alt={nombres} />
                ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <button
                      className="text-sm font-semibold text-primary hover:underline"
                      onClick={() => navigate(`/alumnos/details/${a.id}`)}
                    >
                      {nombres || "Sin nombre"}
                    </button>
                    <div className="text-xs text-muted-foreground">
                      {a.email ?? "—"}
                    </div>

                    <Collapsible
                      open={isExpanded}
                      onOpenChange={(open) =>
                        setExpanded((prev) => ({ ...prev, [a.id]: open }))
                      }
                    >
                      <CollapsibleContent className="mt-2 text-xs text-muted-foreground">
                        <div>Grado: {a.grado_id ?? "—"}</div>
                        <div>Sección: {a.seccion_id ?? "—"}</div>
                        <div>Estado: {a.estado_id ?? "—"}</div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="p-1">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem
                          onClick={() => navigate(`/alumnos/edit/${a.id}`)}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(a.id)}>
                          Eliminar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            setExpanded((prev) => ({
                              ...prev,
                              [a.id]: !prev[a.id],
                            }))
                          }
                        >
                          {isExpanded ? "Ocultar detalles" : "Ver detalles"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
