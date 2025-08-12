import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { Alumno } from "../pages/AlumnosPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleCheck,
  EllipsisVertical,
  FileDown,
  FileSpreadsheet,
  Plus,
  ShieldX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  data?: Alumno[];
}

export const TablaAlumnos = ({ data }: Props) => {
  console.log("💻 - TablaAlumnos - data:", data);
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(5);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const columns: ColumnDef<Alumno>[] = [
    {
      id: "alumno",
      header: "Alumno",
      accessorFn: (row) => row.nombres,
      cell: ({ row }) => {
        const alumno = row.original;
        const initials = alumno.nombres
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {alumno.img ? (
                <AvatarImage src={alumno.img} alt={alumno.nombres} />
              ) : (
                <AvatarFallback>{initials}</AvatarFallback>
              )}
            </Avatar>

            <div className="min-w-0">
              <button
                className="block text-left text-sm font-medium text-primary hover:underline"
                onClick={() => navigate(`/alumnos/details/${alumno.id}`)}
              >
                {alumno.nombres} {alumno.apellido_paterno}{" "}
                {alumno.apellido_materno}
              </button>
              <div className="text-xs text-muted-foreground truncate">
                {alumno.email ?? "—"}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.estado_id.nombre === "Activo" ? (
            <CircleCheck className="fill-green-500 dark:fill-green-500 text-white " />
          ) : (
            <ShieldX className="fill-red-500 dark:fill-red-500 text-white " />
          )}
          {row.original.estado_id.nombre}
        </Badge>
      ),
    },
    {
      accessorKey: "grado_seccion",
      header: "Grado / Sección",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.grado_id.nombre} {row.original.seccion_id.nombre}
        </Badge>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const alumno = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <EllipsisVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={() => navigate(`/alumnos/edit/${alumno.id}`)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>Make a copy</DropdownMenuItem>
              <DropdownMenuItem>Favorite</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  function handleDelete(id: string) {
    console.log("💻 - handleDelete - id:", id);
    // Solo UI: dejar espacio para la lógica real:
    // TODO: confirmar eliminación con modal y llamar al backend
    if (!confirm("¿Eliminar alumno? (esto es solo UI, implementar backend)"))
      return;
    // setData((prev) => prev.filter((p) => p.id !== id));
  }

  function exportToExcel(rows: Alumno[]) {
    const sheetData = rows.map((r) => ({
      ID: r.id,
      Nombre: r.nombres,
      Email: r.email ?? "",
      Grado: r.grado ?? "",
      Sección: r.seccion ?? "",
      Estado: r.estado ?? "",
    }));
    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Alumnos");
    XLSX.writeFile(wb, "alumnos.xlsx");
  }

  function exportToPDF(rows: Alumno[]) {
    const doc = new jsPDF({ orientation: "landscape" });
    const head = [["ID", "Nombre", "Email", "Grado", "Sección", "Estado"]];
    const body = rows.map((r) => [
      r.id,
      r.nombres,
      r.email ?? "",
      r.grado ?? "",
      r.seccion ?? "",
      r.estado ?? "",
    ]);
    autoTable(doc, {
      head,
      body,
      startY: 10,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [60, 60, 60] },
    });

    doc.save("alumnos.pdf");
  }

  // muestra export de todas las filas filtradas (no solo la página)
  function handleExportExcelAll() {
    const rows = table.getFilteredRowModel().rows.map((r) => r.original);
    exportToExcel(rows);
  }
  function handleExportPDFAll() {
    const rows = table.getFilteredRowModel().rows.map((r) => r.original);
    exportToPDF(rows);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Buscar alumno, email, grado..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-[260px]"
          />
          <Button variant="outline" onClick={handleExportPDFAll}>
            <FileDown className="mr-2 h-4 w-4" /> PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcelAll}>
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => navigate("/alumnos/new")}>
            <Plus className="mr-2 h-4 w-4" /> Crear alumno
          </Button>
        </div>
      </div>

      {isMobile ? (
        // MODO TARJETAS: mejor experiencia en móvil
        <div className="grid grid-cols-1 gap-4">
          {table.getRowModel().rows.map((row) => {
            const a = row.original;
            const initials = a.nombres
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();
            return (
              <Card key={a.id} className="p-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    {a.img ? (
                      <AvatarImage src={a.img} alt={a.nombres} />
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
                          {a.nombres}
                        </button>
                        <div className="text-xs text-muted-foreground">
                          {a.email}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{a.grado}</div>
                        <div className="text-xs text-muted-foreground">
                          {a.seccion}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/alumnos/edit/${a.id}`)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(a.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        // MODO TABLA (desktop / tablet)
        <div className="overflow-x-auto border rounded-lg bg-card">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label
              htmlFor="rows-per-page"
              className="text-sm font-normal text-muted-foreground "
            >
              Rows per page
            </Label>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                setPageSize(Number(value));
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger
                size="sm"
                className="!bg-transparent !border-none !shadow-none hover:!bg-muted/20 flex items-center justify-center p-2 text-muted-foreground  "
                id="rows-per-page"
              >
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((s) => (
                  <SelectItem key={s} value={`${s}`}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-normal text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
