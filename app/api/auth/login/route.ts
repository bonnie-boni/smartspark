import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ message: 'Username and password required' }, { status: 400 })
  }

  if (username !== 'admin' || password !== 'defaultpass') {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  return NextResponse.json({ token: 'smartspark-admin-token', message: 'Login successful' })
}
