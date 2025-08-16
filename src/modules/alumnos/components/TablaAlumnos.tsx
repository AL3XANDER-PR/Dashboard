// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

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
import MobileAlumnosList from "./MobileAlumnosList";

interface Props {
  data?: Alumno[];
}

export default function TablaAlumnos({ data }: Props) {
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
          {row.original?.estado_id === "Activo" ? (
            <CircleCheck className="fill-green-500 dark:fill-green-500 text-white " />
          ) : (
            <ShieldX className="fill-red-500 dark:fill-red-500 text-white " />
          )}
          {row.original.estado_id}
        </Badge>
      ),
    },
    {
      accessorKey: "grado_seccion",
      header: "Grado / Sección",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.grado_id} {row.original.seccion_id}
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
    data: data ?? [],
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

  async function exportToExcel(rows: Alumno[]) {
    const XLSX = await import("xlsx");
    const sheetData = rows.map((r) => ({
      Codigo: r.codigo,
      Nombre: r.nombres,
      Apellidos: `${r.apellido_paterno} ${r.apellido_materno}`,
      Email: r.email ?? "",
      Grado: r.grado_id ?? "",
      Sección: r.seccion_id ?? "",
      Estado: r.estado_id ?? "",
    }));
    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Alumnos");
    XLSX.writeFile(wb, "alumnos.xlsx");
  }

  async function exportToPDF(rows: Alumno[]) {
    const { default: jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "A4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    // Encabezado
    doc.setFontSize(14);
    doc.setFillColor(173, 216, 230); // color celeste
    doc.rect(40, 20, pageWidth - 80, 30, "F");
    doc.text("LISTA DE ASISTENCIA", pageWidth / 2, 40, { align: "center" });

    // Datos del plantel
    doc.setFontSize(10);
    const startY = 60;
    doc.rect(40, startY, 150, 20);
    doc.text("PLANTEL", 45, startY + 15);
    doc.rect(190, startY, 300, 20); // valor
    doc.rect(500, startY, 100, 20);
    doc.text("MES", 505, startY + 15);
    doc.rect(600, startY, 100, 20); // valor

    // Más campos (Asignatura, Profesor, Fecha, Grado, Grupo)
    const infoY = startY + 25;
    const cellHeight = 20;
    doc.rect(40, infoY, 150, cellHeight);
    doc.text("ASIGNATURA", 45, infoY + 15);
    doc.rect(190, infoY, 300, cellHeight); // valor
    doc.rect(500, infoY, 100, cellHeight);
    doc.text("PROFESOR", 505, infoY + 15);
    doc.rect(600, infoY, 100, cellHeight); // valor

    const rowY = infoY + 25;
    doc.rect(40, rowY, 100, cellHeight);
    doc.text("FECHA", 45, rowY + 15);
    doc.rect(140, rowY, 100, cellHeight); // valor
    doc.rect(240, rowY, 100, cellHeight);
    doc.text("GRADO", 245, rowY + 15);
    doc.rect(340, rowY, 100, cellHeight); // valor
    doc.rect(440, rowY, 100, cellHeight);
    doc.text("GRUPO", 445, rowY + 15);
    doc.rect(540, rowY, 100, cellHeight); // valor

    // Tabla de asistencia
    const tableHead = ["No.", "No. CONTROL", "NOMBRE DEL ALUMNO"];
    for (let i = 1; i <= 30; i++) tableHead.push(i.toString());

    const tableBody = rows.map((a, idx) => {
      const row = [idx + 1, a.codigo, a.nombres];
      for (let i = 0; i < 30; i++) row.push(""); // columnas de asistencia
      return row;
    });

    autoTable(doc, {
      head: [tableHead],
      body: tableBody,
      startY: rowY + 50,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [173, 216, 230] },
    });

    // Leyenda
    const legendY = doc.lastAutoTable.finalY + 20;
    doc.rect(40, legendY, 15, 15);
    doc.text("• ASISTENCIA", 60, legendY + 12);
    doc.rect(160, legendY, 15, 15);
    doc.text("/ RETARDO", 180, legendY + 12);
    doc.rect(260, legendY, 15, 15);
    doc.text("X FALTA", 280, legendY + 12);

    // Firmas
    const firmaY = legendY + 50;
    doc.text("_____________________________________", 40, firmaY);
    doc.text("NOMBRE Y FIRMA DEL DOCENTE", 50, firmaY + 12);

    doc.text("_____________________________________", 400, firmaY);
    doc.text("NOMBRE Y FIRMA DEL DIRECTOR", 410, firmaY + 12);

    doc.save("lista_asistencia.pdf");
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
          <MobileAlumnosList rows={table.getRowModel().rows} />
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
}
