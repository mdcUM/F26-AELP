import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      // so internal routes only

      // note that there are two kind of error handles here. If the auth fails, it goes to /auth/error?error, but if the callback is disallowed, then it goes to the fallback /admin callback

      if (!next) {
        redirect(`/admin`);
      } else {

        try {
          // pretty much just makes sure its a same origin url
          const url = new URL(next, "http://local");

          if (url.origin === "http://local") {
            redirect(url.pathname + url.search + url.hash);
          } else {
            redirect(`/admin`);
          }
        } catch {
          redirect(`/admin`);
        }
      }

    } else {
      // redirect the user to an error page with some instructions
      redirect(`/auth/error?error=${error?.message}`);
    }
  }

  // redirect the user to an error page with some instructions
  redirect(`/auth/error?error=No token hash or type`);
}
