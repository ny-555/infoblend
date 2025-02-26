import UserAuthForm from "@/components/user-auth-form";

export default function Login() {
  return (
    <div className="container mx-auto px-8 flex flex-col justify-center h-screen items-center w-screen">
      <div className="w-full sm:w-[450px] flex flex-col space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            ようこそ。
            <br />
            または、おかえりなさい。
          </h1>
          <p className="text-lg text-muted-foreground">
            GoogleまたはGitHubでログインできます。
          </p>
        </div>

        <UserAuthForm />
      </div>
    </div>
  );
}
