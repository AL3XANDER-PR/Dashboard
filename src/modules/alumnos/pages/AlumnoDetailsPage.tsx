"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, FileDown, Pencil, Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AlumnoDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [periodo, setPeriodo] = useState("2025-1");
  const [esPeriodoActual, setEsPeriodoActual] = useState(true);

  // Datos mock para gráficos y tablas
  const notasData = [
    { materia: "Matemáticas", nota: 8.9 },
    { materia: "Lengua", nota: 8.4 },
    { materia: "Ciencias", nota: 9.1 },
    { materia: "Historia", nota: 8.0 },
    { materia: "Arte", nota: 9.3 },
  ];

  const asistenciasData = [
    { fecha: "2025-08-01", estado: "Presente" },
    { fecha: "2025-08-02", estado: "Ausente" },
    { fecha: "2025-08-03", estado: "Tarde" },
    { fecha: "2025-08-04", estado: "Presente" },
  ];

  const pagosData = [
    { mes: "Enero", estado: "Pagado" },
    { mes: "Febrero", estado: "Pendiente" },
    { mes: "Marzo", estado: "Pagado" },
  ];

  useEffect(() => {
    if (id) {
      // TODO: fetchAlumnoDetails(id, periodo)
    }
    // Determinar si el periodo seleccionado es el actual
    setEsPeriodoActual(periodo === "2025-1");
  }, [id, periodo]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/alumnos")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver
          </Button>
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-1">2025 - 1er Semestre</SelectItem>
              <SelectItem value="2024-2">2024 - 2do Semestre</SelectItem>
              <SelectItem value="2024-1">2024 - 1er Semestre</SelectItem>
            </SelectContent>
          </Select>
          {!esPeriodoActual && (
            <div className="flex items-center text-yellow-600 text-sm">
              <Lock className="h-4 w-4 mr-1" /> Periodo cerrado - Solo lectura
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!esPeriodoActual}
            onClick={() => navigate(`/alumnos/edit/${id}`)}
          >
            <Pencil className="h-4 w-4 mr-2" /> Editar
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" /> Exportar PDF
          </Button>
        </div>
      </div>

      {/* Ficha del alumno */}
      <Card>
        <CardContent className="flex flex-col md:flex-row gap-6 items-center md:items-start p-6">
          <Avatar className="w-28 h-28">
            <AvatarImage src="/placeholder-alumno.jpg" alt="Foto del alumno" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold">Juan Pérez</h2>
            <p className="text-muted-foreground">6to de primaria | Sección A</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <p>
                <strong>Edad:</strong> 12 años
              </p>
              <p>
                <strong>Apoderado:</strong> María López
              </p>
              <p>
                <strong>Teléfono:</strong> 999 888 777
              </p>
              <p>
                <strong>Email:</strong> maria@example.com
              </p>
              <p>
                <strong>Estado:</strong> Activo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicadores clave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Promedio de notas</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-center">
            8.7 / 10
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Asistencia último mes</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-center">
            95%
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Estado de pagos</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-green-600 font-semibold">
            Al día
          </CardContent>
        </Card>
      </div>

      {/* Pestañas */}
      <Tabs defaultValue="asistencias" className="w-full">
        <TabsList>
          <TabsTrigger value="asistencias">Asistencias</TabsTrigger>
          <TabsTrigger value="horarios">Horarios</TabsTrigger>
          <TabsTrigger value="notas">Notas</TabsTrigger>
          <TabsTrigger value="pagos">Pagos</TabsTrigger>
        </TabsList>

        <TabsContent value="asistencias">
          <Card>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {asistenciasData.map((a, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{a.fecha}</TableCell>
                      <TableCell>{a.estado}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notas">
          <Card>
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={notasData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="materia" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar dataKey="nota" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagos">
          <Card>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mes</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagosData.map((p, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{p.mes}</TableCell>
                      <TableCell>{p.estado}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
