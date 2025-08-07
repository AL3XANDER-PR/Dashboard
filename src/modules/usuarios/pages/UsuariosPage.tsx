import { useParams } from "react-router-dom";
const UsuariosPage = () => {
  const { id } = useParams();
  return (
    <div>
      {id ? (
        <h1 className="text-2xl font-bold">Usuario ID: {id}</h1>
      ) : (
        <h1 className="text-2xl font-bold">Bienvenido a la página de inicio</h1>
      )}
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam animi
      maiores mollitia asperiores culpa voluptate dolores quaerat numquam quas!
      Molestiae quod expedita vel adipisci totam, vitae, repudiandae
      reprehenderit labore voluptatibus iusto excepturi tenetur eum delectus
      voluptates, voluptatum saepe numquam assumenda odit dolore ipsa. Mollitia
      explicabo laborum quidem obcaecati assumenda corporis?
    </div>
  );
};
export default UsuariosPage;

// [{
//   path: "/dashboard",
//   component: "HomePage",
//   layout: "MainLayout",
//   id: 1,
// },
// {
//   path: "usuarios",
//   component: "HomePage",
//   layout: "MainLayout",
//   id: 2,
//   parentId: 1,
//   params:':usuarioId',
// },
// {
//   path: "productos",
//   component: "HomePage",
//   layout: "MainLayout",
//   id: 3,
//   parentId: 1,
//   params:':productoId',
// }]
