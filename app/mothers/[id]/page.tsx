interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MotherDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Detail Ibu Hamil
      </h1>

      <p className="mt-4">
        ID: {id}
      </p>
    </main>
  );
}