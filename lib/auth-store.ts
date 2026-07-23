const SESSION_KEY = "bff_auth_session";
const ACCOUNTS_KEY = "bff_accounts";

export interface AuthUser {
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface StoredAccount extends AuthUser {
  password: string;
}

function readAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function getSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setSession(user: AuthUser) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function findAccount(email: string): StoredAccount | undefined {
  return readAccounts().find(
    (a) => a.email.toLowerCase() === email.toLowerCase()
  );
}

export function createAccount(input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const accounts = readAccounts();
  if (
    accounts.some((a) => a.email.toLowerCase() === input.email.toLowerCase())
  ) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const account: StoredAccount = {
    email: input.email.trim().toLowerCase(),
    password: input.password,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    createdAt: new Date().toISOString(),
  };

  writeAccounts([...accounts, account]);

  const { password: _, ...user } = account;
  return { ok: true, user };
}

export function authenticate(
  email: string,
  password: string
): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const account = findAccount(email);
  if (!account) {
    return { ok: false, error: "Invalid email or password." };
  }
  if (account.password !== password) {
    return { ok: false, error: "Invalid email or password." };
  }

  const { password: _, ...user } = account;
  return { ok: true, user };
}

export function simulateAuthDelay(ms = 900) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
