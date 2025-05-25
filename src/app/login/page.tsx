import { login, signup } from "@/src/lib/supabase/actios";

export default async function Page() {
  return (
    <span className="w-full flex items-center justify-center py-20">
      <form className="flex flex-col max-w-[300px] ">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
    </span>
  );
}
