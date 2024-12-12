// app/dashboard/users/page.tsx

import { getUsersInformation } from "@/usuarios/actions/getUsersInformation";
import { ShowUsersInformation } from "@/usuarios/componentes/ShowUsersInformation";


export default async function UsersPage() {
  const users = await getUsersInformation();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Usuarios</h1>
      <ShowUsersInformation users={users} />
    </div>
  );
}
