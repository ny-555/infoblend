export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-8 flex flex-col justify-center h-screen items-center w-screen">
      <div className="w-full sm:w-[450px] flex flex-col space-y-6">
        <div className="md:text-center space-y-4">
          <h1 className="text-4xl md:5xl lg:text-6xl font-bold">404😣</h1>
          <p className="text-md lg:text-xl text-muted-foreground">
            あなたが探しているページが見つかりません
          </p>
        </div>
      </div>
    </div>
  );
}
