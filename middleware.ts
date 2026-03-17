import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {

  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value
        },
        set(name, value, options) {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          res.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    }
  )

  

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const protectedRoutes = ["/dashboard", "/pets", "/consultas"]

  const isProtected = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  )

  // 🔐 Se não estiver logado → manda pro login
  if (!user && isProtected) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // 🔁 Se estiver logado e tentar acessar login/cadastro → manda pro dashboard
  if (user && (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/cadastro")) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }


  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/pets/:path*", "/consultas/:path*", "/login", "/cadastro"],
}