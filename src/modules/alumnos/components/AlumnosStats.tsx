import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CalendarCheck, GraduationCap, Users } from "lucide-react";
interface Props {
  TAlumnos?: number;
  TProfesores?: number;
  TCursos?: number;
  Tasistencias?: number;
}
export const AlumnosStats = ({
  TAlumnos = 0,
  TProfesores = 0,
  TCursos = 0,
  Tasistencias = 0,
}: Props) => {
  const stats = [
    {
      title: "Total Alumnos",
      value: TAlumnos,
      icon: Users,
      color: "blue",
      bgColor: "bg-blue-900",
    },
    {
      title: "Total Profesores",
      value: TProfesores,
      icon: GraduationCap,
      color: "green",
      bgColor: "bg-green-900",
    },
    {
      title: "Cursos Activos",
      value: TCursos,
      icon: BookOpen,
      color: "yellow",
      bgColor: "bg-yellow-900/80",
    },
    {
      title: "Asistencia Promedio",
      value: `${Tasistencias}%`,
      icon: CalendarCheck,
      color: "purple",
      bgColor: "bg-purple-900",
    },
  ];

  return (
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
  );
};
