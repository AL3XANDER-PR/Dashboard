import { useMemo, useState, useEffect, type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  Pencil,
  Trash2,
  FileDown,
  FileSpreadsheet,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  TrendingUp,
  TrendingDown,
  Users,
  CalendarCheck,
  BookOpen,
  UserCheck,
  CheckCircle,
  Award,
  GraduationCap,
  DotSquareIcon,
  EllipsisVertical,
  ArrowUpDown,
  CheckCircle2,
  ShieldX,
  CircleCheckBig,
  LucideCircleCheckBig,
  CircleCheck,
} from "lucide-react";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// -----------------------------
// Types
// -----------------------------
type Alumno = {
  id: string;
  nombre: string;
  email?: string;
  grado?: string;
  seccion?: string;
  estado?: "Activo" | "Inactivo";
  img?: string; // url opcional
  // otras propiedades que quieras
};

// -----------------------------
// Mock / placeholder: reemplazar por fetch real
// -----------------------------
const MOCK_ALUMNOS: Alumno[] = [
  {
    id: "1",
    nombre: "Carlos Díaz",
    email: "carlos@example.com",
    grado: "6to",
    seccion: "A",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "2",
    nombre: "María López",
    email: "maria@example.com",
    grado: "5to",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "3",
    nombre: "Juan Pérez",
    email: "juanp@example.com",
    grado: "4to",
    seccion: "A",
    estado: "Activo",
    img: "",
  },
  {
    id: "4",
    nombre: "Ana Torres",
    email: "ana@example.com",
    grado: "3ro",
    seccion: "C",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "5",
    nombre: "Luis Martínez",
    email: "luis@example.com",
    grado: "6to",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "6",
    nombre: "Sofía Herrera",
    email: "sofia@example.com",
    grado: "2do",
    seccion: "A",
    estado: "Activo",
    img: "",
  },
  {
    id: "7",
    nombre: "Pedro Sánchez",
    email: "pedro@example.com",
    grado: "5to",
    seccion: "C",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "8",
    nombre: "Laura Gómez",
    email: "laura@example.com",
    grado: "4to",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "9",
    nombre: "Andrés Ramírez",
    email: "andres@example.com",
    grado: "6to",
    seccion: "A",
    estado: "Activo",
    img: "",
  },
  {
    id: "10",
    nombre: "Valeria Castro",
    email: "valeria@example.com",
    grado: "3ro",
    seccion: "C",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "11",
    nombre: "Gabriel Fernández",
    email: "gabriel@example.com",
    grado: "5to",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "12",
    nombre: "Isabella Molina",
    email: "isabella@example.com",
    grado: "4to",
    seccion: "A",
    estado: "Activo",
    img: "",
  },
  {
    id: "13",
    nombre: "Miguel Ortega",
    email: "miguel@example.com",
    grado: "2do",
    seccion: "B",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "14",
    nombre: "Camila Reyes",
    email: "camila@example.com",
    grado: "6to",
    seccion: "C",
    estado: "Activo",
    img: "",
  },
  {
    id: "15",
    nombre: "Diego Silva",
    email: "diego@example.com",
    grado: "5to",
    seccion: "A",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "16",
    nombre: "Paula Vargas",
    email: "paula@example.com",
    grado: "4to",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "17",
    nombre: "Javier Morales",
    email: "javier@example.com",
    grado: "3ro",
    seccion: "C",
    estado: "Activo",
    img: "",
  },
  {
    id: "18",
    nombre: "Lucía Peña",
    email: "lucia@example.com",
    grado: "2do",
    seccion: "A",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "19",
    nombre: "Fernando Gutiérrez",
    email: "fernando@example.com",
    grado: "6to",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "20",
    nombre: "Natalia Herrera",
    email: "natalia@example.com",
    grado: "5to",
    seccion: "C",
    estado: "Activo",
    img: "",
  },
  {
    id: "21",
    nombre: "Álvaro Castillo",
    email: "alvaro@example.com",
    grado: "4to",
    seccion: "A",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "22",
    nombre: "Martina Soto",
    email: "martina@example.com",
    grado: "3ro",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "23",
    nombre: "Rodrigo Flores",
    email: "rodrigo@example.com",
    grado: "6to",
    seccion: "C",
    estado: "Activo",
    img: "",
  },
  {
    id: "24",
    nombre: "Daniela Vega",
    email: "daniela@example.com",
    grado: "5to",
    seccion: "A",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "25",
    nombre: "Hugo Paredes",
    email: "hugo@example.com",
    grado: "4to",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "26",
    nombre: "Emma Luna",
    email: "emma@example.com",
    grado: "3ro",
    seccion: "C",
    estado: "Activo",
    img: "",
  },
  {
    id: "27",
    nombre: "Cristian León",
    email: "cristian@example.com",
    grado: "2do",
    seccion: "A",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "28",
    nombre: "Renata Ríos",
    email: "renata@example.com",
    grado: "6to",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "29",
    nombre: "Esteban Cabrera",
    email: "esteban@example.com",
    grado: "5to",
    seccion: "C",
    estado: "Activo",
    img: "",
  },
  {
    id: "30",
    nombre: "Ariana Salas",
    email: "ariana@example.com",
    grado: "4to",
    seccion: "A",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "31",
    nombre: "Tomás Correa",
    email: "tomas@example.com",
    grado: "3ro",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "32",
    nombre: "Mía Navarro",
    email: "mia@example.com",
    grado: "6to",
    seccion: "C",
    estado: "Activo",
    img: "",
  },
  {
    id: "33",
    nombre: "Sebastián Figueroa",
    email: "sebastian@example.com",
    grado: "5to",
    seccion: "A",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "34",
    nombre: "Clara Cárdenas",
    email: "clara@example.com",
    grado: "4to",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "35",
    nombre: "Ignacio Bravo",
    email: "ignacio@example.com",
    grado: "3ro",
    seccion: "C",
    estado: "Activo",
    img: "",
  },
  {
    id: "36",
    nombre: "Julieta Campos",
    email: "julieta@example.com",
    grado: "2do",
    seccion: "A",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "37",
    nombre: "Matías Rojas",
    email: "matias@example.com",
    grado: "6to",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
  {
    id: "38",
    nombre: "Valentina Duarte",
    email: "valentinad@example.com",
    grado: "5to",
    seccion: "C",
    estado: "Activo",
    img: "",
  },
  {
    id: "39",
    nombre: "Felipe Muñoz",
    email: "felipe@example.com",
    grado: "4to",
    seccion: "A",
    estado: "Inactivo",
    img: "",
  },
  {
    id: "40",
    nombre: "Bianca Serrano",
    email: "bianca@example.com",
    grado: "3ro",
    seccion: "B",
    estado: "Activo",
    img: "",
  },
];

// -----------------------------
// Component
// -----------------------------
export default function AlumnosPage(): JSX.Element {
  const navigate = useNavigate();

  // estado: datos (luego conecta con backend)
  const [data, setData] = useState<Alumno[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(5);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  useEffect(() => {
    // TODO: reemplazar por fetch real desde tu API
    // fetch("/api/alumnos").then(...).then(setData)
    setData(MOCK_ALUMNOS);
  }, []);

  // columnas
  const columns = useMemo<ColumnDef<Alumno, any>[]>(() => {
    return [
      {
        id: "alumno",
        header: "Alumno",
        accessorFn: (row) => row.nombre,
        cell: ({ row }) => {
          const alumno = row.original;
          const initials = alumno.nombre
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                {alumno.img ? (
                  <AvatarImage src={alumno.img} alt={alumno.nombre} />
                ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
              </Avatar>

              <div className="min-w-0">
                <button
                  className="block text-left text-sm font-medium text-primary hover:underline"
                  onClick={() => navigate(`/alumnos/details/${alumno.id}`)}
                >
                  {alumno.nombre}
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
            {row.original.estado === "Activo" ? (
              <CircleCheck className="fill-green-500 dark:fill-green-500 text-white " />
            ) : (
              <ShieldX className="fill-red-500 dark:fill-red-500 text-white " />
            )}
            {row.original.estado}
          </Badge>
        ),
      },
      {
        accessorKey: "grado_seccion",
        header: "Grado / Sección",
        cell: ({ row }) => (
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {row.original.grado} {row.original.seccion}
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
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  }, [navigate]);

  // tabla (tanstack)
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

  // -----------------------------
  // Handlers
  // -----------------------------
  function handleDelete(id: string) {
    // Solo UI: dejar espacio para la lógica real:
    // TODO: confirmar eliminación con modal y llamar al backend
    if (!confirm("¿Eliminar alumno? (esto es solo UI, implementar backend)"))
      return;
    setData((prev) => prev.filter((p) => p.id !== id));
  }

  function exportToExcel(rows: Alumno[]) {
    const sheetData = rows.map((r) => ({
      ID: r.id,
      Nombre: r.nombre,
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
      r.nombre,
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

  // -----------------------------
  // Responsive: en sm mostramos tarjetas en lugar de tabla
  // -----------------------------
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // -----------------------------
  // Render
  // -----------------------------

  const stats = [
    {
      title: "Total Alumnos",
      value: data.length,
      icon: Users,
      color: "blue",
      bgColor: "bg-blue-900",
    },
    {
      title: "Total Profesores",
      value: 25,
      icon: GraduationCap,
      color: "green",
      bgColor: "bg-green-900",
    },
    {
      title: "Cursos Activos",
      value: 15,
      icon: BookOpen,
      color: "yellow",
      bgColor: "bg-yellow-900/80",
    },
    {
      title: "Asistencia Promedio",
      value: "94%",
      icon: CalendarCheck,
      color: "purple",
      bgColor: "bg-purple-900",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`  border-none shadow-sm py-0`}>
            <CardContent className="flex justify-between items-center p-4">
              {/* Texto */}
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-accent-foreground">{stat.title}</p>
              </div>

              {/* Icono */}
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-bl from-${stat.color}-500/20 to-transparent rounded-xl`}
                ></div>
                <div
                  className={`relative flex items-center justify-center h-12 w-12 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Header tabla: búsqueda / export / crear */}
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

      {/* Tabla o tarjetas (mobile) */}
      {isMobile ? (
        // MODO TARJETAS: mejor experiencia en móvil
        <div className="grid grid-cols-1 gap-4">
          {table.getRowModel().rows.map((row) => {
            const a = row.original;
            const initials = a.nombre
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
                      <AvatarImage src={a.img} alt={a.nombre} />
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
                          {a.nombre}
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

      {/* Paginación (cliente) */}

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
    </div>
  );
}
