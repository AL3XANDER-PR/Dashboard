import { Navigate, useParams } from "react-router-dom";

export default function EditPage() {
  const { id } = useParams();
  console.log("💻 - EditPage - id:", id);

  if (!id) {
    return <Navigate to="/usuarios" replace />;
  }
  return <div>EditPage: {id}</div>;
}
