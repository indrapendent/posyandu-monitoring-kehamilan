import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard
      </h1>

      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
    </main>
  );
}